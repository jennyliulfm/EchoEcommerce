using System;
namespace Echo.Ecommerce.Host.Models
{
    public class OrderProduct
    {
        public int OrderProductId { get; set; }
        public Order Order { get; set; }

        public Product Product { get; set; }
        public int Quantity { get; set; }

        public OrderProduct()
        {
        }

        public OrderProduct(Entities.OrderProduct model)
        {
            this.OrderProductId = model.OrderProductId;
            this.Order = new Models.Order(model.Order);
            this.Product = new Models.Product(model.Product);
            this.Quantity = model.Quantity;
        }


        public int OrderId { get; set; }

        public int ProductId { get; set; }
    }
}
