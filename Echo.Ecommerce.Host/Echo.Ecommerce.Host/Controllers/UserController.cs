using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Echo.Ecommerce.Host.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using System.Text;

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
        private readonly MailSenderSetting _emailSettings;
        private readonly AppSetting _appSettings;

        public UserController(ILoggerFactory loggerFactory, DBContext dbContext, UserManager<Entities.User> userManager, SignInManager<Entities.User> signinManager, IOptions<MailSenderSetting> mailSetting, IOptions<AppSetting> appSetting)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;

            this._userManager = userManager;
            this._signinManager = signinManager;
            this._emailSettings = mailSetting.Value;
            this._appSettings = appSetting.Value;
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<ActionResult> RegisterUser(Models.User model)
        {
            try
            {
                //Verify whether the mail exists or not. 
                var user = this._dbContext.AppUsers.FirstOrDefault(u => u.Email.Equals(model.Email));
                if (user != null) return BadRequest("Email has been used");

                Entities.User newUser = new Entities.User()
                {
                    Email = model.Email,
                    UserName = String.Format("{0} {1}", model.FirstName, model.LastName),
                };

                var hashPassword = _userManager.PasswordHasher.HashPassword(newUser, model.Password);
                newUser.PasswordHash = hashPassword;

                await this._dbContext.AppUsers.AddAsync(newUser);

                int result = await this._dbContext.SaveChangesAsync();
                if (result > 0)
                {
                    this.SendMail(newUser);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "RegisterUser Failed");
                return BadRequest();
            }

        }

        private void SendMail(Entities.User user)
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
            catch(Exception ex)
            {
                this._logger.LogError(ex, "SendMail Failed");
            }
          

        }
    }
}