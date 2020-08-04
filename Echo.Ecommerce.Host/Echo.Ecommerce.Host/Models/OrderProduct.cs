using System;
namespace Echo.Ecommerce.Host.Models
{
    public class OrderProduct
    {
        public int OrderProductId { get; set; }

        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public OrderProduct(Entities.OrderProduct orderProduct)
        {
            ProductId = orderProduct.ProductId;
            Quantity = orderProduct.Quantity;

        }
    }
}
