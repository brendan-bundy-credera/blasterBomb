using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProjectApi.Modules.Common.Entities
{
    public static class GroupProjectDataGenerator
    {
        public static void InitializeInMemoryGroupProjectDatabase(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            using (var context = serviceScope.ServiceProvider.GetService<GroupProjectDbContext>())
            {
                if (!context.Products.Any())
                {
                    context.Products.AddRange(
                        new Product { ProductId = 1, Name = "Banana", Description = "A tasty yellow banana", Price = 1.23m },
                        new Product { ProductId = 2, Name = "Apple", Description = "A delicious red apple", Price = 2.50m },
                        new Product { ProductId = 3, Name = "Orange", Description = "A zesty orangish orange", Price = 3.00m }
                    );

                    context.Carts.Add(
                        new Cart
                        {
                            CartId = 1,
                            CartProducts = new List<CartProduct> {
                                new CartProduct { ProductId = 1, CartId = 1, Quantity = 1  },
                                new CartProduct { ProductId = 2, CartId = 1, Quantity = 2  },
                                new CartProduct { ProductId = 3, CartId = 1, Quantity = 1  },
                            }
                        }
                    );
                    context.SaveChanges();
                }
            }
        }
    }
}
