using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Echo.Ecommerce.Host.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Echo.Ecommerce.Host.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AddressController : BasicController
    {
        private readonly ILogger _logger;
        private readonly DBContext _dbContext;

        private readonly UserManager<Entities.User> _userManager;
        private readonly SignInManager<Entities.User> _signinManager;
        private readonly MailSenderSetting _emailSettings;
        private readonly AppSetting _appSettings;

        public AddressController(ILoggerFactory loggerFactory, DBContext dbContext, UserManager<Entities.User> userManager, SignInManager<Entities.User> signinManager, IOptions<MailSenderSetting> mailSetting, IOptions<AppSetting> appSetting): base(dbContext)
        {
            this._logger = loggerFactory.CreateLogger(this.GetType().Name);
            this._dbContext = dbContext;

            this._userManager = userManager;
            this._signinManager = signinManager;
        }

        [HttpPost]
        [Route("AddAddressForUser")]
        public async Task<ActionResult<Models.Address>> AddAddressForUser(Models.Address model)
        {
            try
            {
                var user = this.GetUser();
                if (user == null) return NotFound(new { message = "User Not Found " });

                Entities.Address address = new Entities.Address()
                {
                    Street = model.Street,
                    City = model.City,
                    Country = model.Country,
                    User = user,
                };

                await this._dbContext.Addresses.AddAsync(address);

                int result = await this._dbContext.SaveChangesAsync();
                if (result > 0)
                {
                    return Ok(new Models.Address(address));
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, $"AddAddressForUser Failed");
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("GetAllAddressForUser")]
        public async Task<ActionResult<List<Models.Address>>> GetAllAddressForUser()
        {
            try
            {
                var user = this.GetUser();
                if (user == null) return NotFound(new { message = "User Not Found " });

                var addresses = this._dbContext.Addresses.Where(addr => addr.User.Id == user.Id)
                    .AsNoTracking()
                    .Select(addr => new Models.Address(addr))
                    .ToList();

                return Ok(addresses);
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "GetAllAddressForUser Failed");
                return BadRequest();
            }
        }
    }
}
