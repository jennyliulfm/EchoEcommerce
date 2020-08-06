using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Models
{
    public enum  Role
    {
        Admin,
        General,
    }

    public class User: IdentityUser
    {
        public Address Address { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public string ValidationCode { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }

        public User ()
        {

        }

        public User (Entities.User user)
        {
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;  
            this.UserName = user.UserName;
            this.ValidationCode = user.ValidationCode;
        }

        public User ( Entities.User user, Role role)
        {
            this.FirstName = user.FirstName;
            this.LastName = user.LastName;
            this.Email = user.Email;
            this.UserName = user.UserName;
            this.ValidationCode = user.ValidationCode;
            this.Role = role;
        }
    }
}
