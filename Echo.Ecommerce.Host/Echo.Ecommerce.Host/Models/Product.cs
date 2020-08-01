﻿using System;

namespace Echo.Ecommerce.Host.Models
{
    public class Product
    {
        public int ProductId{ get; set; }    
        public string Name{ get; set; }
        public string Description { get; set; }
  
        public double Price { get; set; }
        public Category Category { get; set; }

        public Product(Entities.Product product)
        {
            ProductId = product.ProductId;
            Name = product.Name;
            Description = product.Description;
            Price = product.Price;
          
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
