using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Models
{
    public class User
    {
        public int UserId { get; set; }
        public Guid Identity { get; set; }   
        public string FullName { get; set; }
        public string Telephone { get; set; }
        public string PassWord { get; set; }
        public Address Address { get; set; }
    }
}
