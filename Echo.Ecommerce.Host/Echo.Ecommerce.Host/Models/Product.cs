using System;

namespace Echo.Ecommerce.Host.Models
{
    public class Product
    {
        public int ProductId{ get; set; }    
        public string Title{ get; set; }
        public string Description { get; set; }
  
        public string Price { get; set; }
        public Category Category { get; set; }

        public Product(Entities.Product product)
        {
            Title = product.Title;
            Description = product.Description;
            Price = product.Price.ToString();

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
