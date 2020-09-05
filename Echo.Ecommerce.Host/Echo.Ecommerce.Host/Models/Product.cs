using System;

namespace Echo.Ecommerce.Host.Models
{
    public class Product
    {
        public int ProductId{ get; set; }    
        public string Name{ get; set; }
        public string Description { get; set; }
  
        public double Price { get; set; }
        public Category Category { get; set; }
        public int Quantity { get; set; }
        public double Discount { get; set; }
        public double NewPrice { get; set; }
        public string Photo_Url { get; set; }

        public Product(Entities.Product product)
        {
            ProductId = product.ProductId;
            Name = product.Name;
            Description = product.Description;
            Price = product.Price;
            Quantity = product.Quantity;
            Discount = product.Discount;
            NewPrice = product.NewPrice;
          
            if(product.Category != null )
            {
                Category = new Models.Category(product.Category);
            }
        }

        public Product()
        {

        }
    }
}
