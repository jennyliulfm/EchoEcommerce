using System;

namespace Echo.Ecommerce.Host.Models
{
    public class Category
    {
        public int CategoryId { get; set; }

        
        public string CategoryName { get; set; }
        public string Description { get; set; }

        public Category()
        {

        }

        public Category(Entities.Category category)
        {
            this.CategoryId = category.CategoryId;
            this.CategoryName = category.CategoryName;
            this.Description = category.Description;
        }
    }
}
