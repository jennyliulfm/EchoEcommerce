using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Models
{
    public class User: IdentityUser
    {
        public Address Address { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public string ValidationCode { get; set; }
        public string Password { get; set; }
    }
}
