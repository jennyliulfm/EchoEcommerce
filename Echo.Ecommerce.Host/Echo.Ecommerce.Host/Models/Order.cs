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
       
        public List<OrderProduct> OrderProducts { get; set; }

        public Order()
        {

        }
        public Order(Entities.Order order)
        {
            OrderId = order.OrderId;
            Price = order.Price;
            IssueDate = order.IssueDate;
            if(order.User!=null)
            {
                User = new User(order.User);
            }
            

            OrderProducts = new List<Models.OrderProduct>();
            if(order.OrderProducts!=null)
            {
                foreach (Entities.OrderProduct op in order.OrderProducts)
                {
                    OrderProducts.Add(new Models.OrderProduct(op));
                }
            }

        }
    }
}
