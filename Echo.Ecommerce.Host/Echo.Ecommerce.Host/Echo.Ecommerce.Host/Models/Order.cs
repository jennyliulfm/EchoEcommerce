using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Echo.Ecommerce.Host.Models
{
    public class Order
    {
        public int OrderId { get; set; }   
        public double Price { get; set; }
        public User User { get; set; }
        public DateTime IssueDate { get; set; }
    }
}
