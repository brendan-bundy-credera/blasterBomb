using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProjectApi.Modules.Common.Entities
{
    public class GroupProjectDbContext : DbContext
    {
        public GroupProjectDbContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<CartProduct> CartProducts { get; set; }
    }
}
