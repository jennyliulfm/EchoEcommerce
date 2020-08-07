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
        public int AddressId { get; set; }
        public  Address Address { get; set; }
       
        public List<OrderProduct> OrderProducts { get; set; }

        public Order()
        {

        }
        public Order(Entities.Order order)
        {
            OrderId = order.OrderId;
            Price = order.Price;
            IssueDate = order.IssueDate;

            if (order.Address!=null )
            {
                this.Address = new Models.Address(order.Address);
            }

            if (order.User != null )
            {
                this.User = new Models.User(order.User);
            }

            if(order.OrderProducts.Count >0 && order.OrderProducts != null )
            {
                OrderProducts = new List<Models.OrderProduct>();
                foreach (Entities.OrderProduct op in order.OrderProducts)
                {
                    OrderProducts.Add(new Models.OrderProduct(op));
                }
            }
        }
    }
}
