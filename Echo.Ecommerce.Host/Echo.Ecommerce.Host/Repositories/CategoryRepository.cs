using System;
using Echo.Ecommerce.Host.Entities;

namespace Echo.Ecommerce.Host.Repositories
{
    public class CategoryRepository: GenericRepository<Category>,ICategoryRepository
    {
        public CategoryRepository(DBContext dBContext): base(dBContext)
        {
        }
    }
}
