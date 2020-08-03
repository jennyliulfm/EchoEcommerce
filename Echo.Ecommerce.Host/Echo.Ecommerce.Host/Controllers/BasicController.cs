using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Echo.Ecommerce.Host.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Echo.Ecommerce.Host.Controllers
{
    public class BasicController : ControllerBase
    {
        private readonly DBContext _dbContext;
        
        public BasicController( DBContext dbContext)
        {
            this._dbContext = dbContext;
        }

        protected string Email
        {
            get
            {
                return this.User.Claims.First(c => c.Type == ClaimTypes.Email).Value;
            }
        }

        protected Entities.User GetUser()
        {
           return this._dbContext.AppUsers.FirstOrDefault(u => u.UserName == this.Email);
        }

    }
}
