using System;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Echo.Ecommerce.Host.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;

namespace Echo.Ecommerce.Host.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        private readonly UserManager<Entities.User> _userManager;
        private readonly SignInManager<Entities.User> _signinManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly MailSenderSetting _emailSettings;
        private readonly AppSetting _appSettings;
        private List<string> _roles;


        public UserController(ILoggerFactory loggerFactory, DBContext dbContext, UserManager<Entities.User> userManager, SignInManager<Entities.User> signinManager, IOptions<MailSenderSetting> mailSetting, IOptions<AppSetting> appSetting, RoleManager<IdentityRole> roleManager)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;

            this._userManager = userManager;
            this._signinManager = signinManager;
            this._roleManager = roleManager;
            this._emailSettings = mailSetting.Value;
            this._appSettings = appSetting.Value;

            this._roles = new List<string>();
            this._roles.Add("Admin");
            this._roles.Add("General");

            this.CreateRole();
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<ActionResult<Models.User>> RegisterUser(Models.User model)
        {
            try
            {
                //Verify whether the mail exists or not. 
                var user = await this._userManager.FindByEmailAsync(model.Email);

                if (user != null) return BadRequest(new { message = "Email has been used" });

                Entities.User newUser = new Entities.User()
                {
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    UserName = model.Email,
                };

                var hashPassword = _userManager.PasswordHasher.HashPassword(newUser, model.Password);
                newUser.PasswordHash = hashPassword;

                // Verify usre's role
                if (model.Email.Equals(this._appSettings.AdminName) && model.Password.Equals(this._appSettings.AdminPassword))
                {
                    model.Role = Role.Admin;
                }
                else
                {
                    model.Role = Role.General;
                }

                var result = await this._userManager.CreateAsync(newUser);
                result = await this._userManager.AddToRoleAsync(newUser, model.Role.ToString());

                if (result.Succeeded)
                {
                    this.SendConfirmedMail(newUser);
                    return Ok(new Models.User(newUser));
                }
                else
                {
                    this._logger.LogError($"RegisterUser Error: {result.Errors.ToString()}");
                    return BadRequest(new { message = "You are having trouble of creating the account, please try later" });
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "RegisterUser Failed");
                return BadRequest();
            }

        }

        private void SendConfirmedMail(Entities.User user)
        {
            try
            {
                string userId = $"uid={user.Id}";
                DateTime expiredDays = DateTime.Now.AddDays(Double.Parse(this._emailSettings.ExpiredDays));
                string expiredDate = $"ex={ expiredDays.ToString("dd/MM/yyyy/HH:mm:ss")}";

                var confirmURL = String.Format("{0}{1}?{2}&{3}", this._appSettings.ClientURL, this._appSettings.UserConfirmedRoute, userId, expiredDate);

                //generating mail message
                var mailMessage = new MimeMessage();
                mailMessage.From.Add(new MailboxAddress(this._emailSettings.Sender, this._emailSettings.FromAddress));
                mailMessage.To.Add(new MailboxAddress(user.UserName, user.Email));
                mailMessage.Subject = this._emailSettings.Subject;

                StringBuilder textBody = new StringBuilder();
                textBody.Append("Please click the follow link to confirm your account \n");
                textBody.Append(confirmURL);
                textBody.Append(String.Join("\n The link will be expired in %d Days\n", Int16.Parse(this._emailSettings.ExpiredDays)));
                mailMessage.Body = new TextPart("plain")
                {
                    Text = textBody.ToString(),
                };

                //SMTP client to send mail
                var client = new SmtpClient();
                client.Connect(this._emailSettings.MailClient, Int32.Parse(this._emailSettings.Port), false);
                client.Authenticate(this._emailSettings.UserID, this._emailSettings.Password);
                client.Send(mailMessage);
                client.Disconnect(true);

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "SendMail Failed");
            }
        }


        [HttpPut]
        [Route("ConfirmUserEmailById")]
        public async Task<ActionResult> ConfirmUserEmailById(Models.User model)
        {
            try
            {
                var user = await this._userManager.FindByIdAsync(model.Id);

                if (user != null && user.EmailConfirmed == false)
                {
                    user.EmailConfirmed = true;

                    var result = await this._userManager.UpdateAsync(user);

                    if (result.Succeeded)
                    {
                        return Ok();
                    }
                    else
                    {
                        return BadRequest(new { message = "User Not Found or Expired URL" });
                    }
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"ConfirmUserEmailById Failed");
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("UserLogin")]
        public async Task<ActionResult> UserLogin(Models.User model)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null) return NotFound("User Not Found");
                if (user.EmailConfirmed == false) return BadRequest(new { message = "Email Not Comfirmed, Please Confirm Your Account " });

                var result = this._userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password);

                if (user != null && result == PasswordVerificationResult.Success)
                {
                    var tokenDescriber = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim("UserId", user.Id.ToString())
                        }),

                        Expires = DateTime.UtcNow.AddMinutes(30),

                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._appSettings.JWTSecret)), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriber);
                    var token = tokenHandler.WriteToken(securityToken);

                    return Ok(new { token });
                }
                else
                {
                    return BadRequest(new { message = "Invalid Email or Password" });
                }

            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"UserLogin Failed");
                return BadRequest();
            }

        }

        private void CreateRole()
        {
            foreach (var r in this._roles)
            {
                var role = this._roleManager.RoleExistsAsync(r).Result;

                if (!role)
                {
                    this._roleManager.CreateAsync(new IdentityRole(r)).GetAwaiter().GetResult();
                }
            }

        }
    }
}