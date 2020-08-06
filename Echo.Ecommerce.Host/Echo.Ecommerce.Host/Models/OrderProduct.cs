using System;
namespace Echo.Ecommerce.Host.Models
{
    public class OrderProduct
    {
        public int OrderProductId { get; set; }
        //public Order Order { get; set; }

        //public int ProductId { get; set; }
        public int Quantity { get; set; }

        public OrderProduct()
        {
        }

        public OrderProduct(Entities.OrderProduct model)
        {
            this.OrderProductId = model.OrderProductId;
            this.OrderId = model.Order.OrderId;
            this.ProductId = model.Product.ProductId;
            this.Quantity = model.Quantity;
        }

        public int OrderId { get; set; }

        public int ProductId { get; set; }
    }
}
