using System;
using Microsoft.EntityFrameworkCore;

namespace Echo.Ecommerce.Host.Entities
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<Address> Addresses { get; set; }

        public void Create()
        {
            this.Database.EnsureCreated();
        }


        public void Clear()
        {
            this.Database.EnsureDeleted();
        }

    }
}
