﻿using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Echo.Ecommerce.Host.Entities
{
    public class DBContext : IdentityDbContext<User>
    {
        public DBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> AppUsers { get; set; }
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