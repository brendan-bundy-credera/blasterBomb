using GroupProjectApi.Modules.Carts.Models;
using GroupProjectApi.Modules.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProjectApi.Modules.Carts
{
    public static class CartsMapperExtensions
    {
        public static CartDto ToCartDto(this Cart cart)
        {
            return new CartDto
            {
                CartId = cart?.CartId ?? 0,
                Products = cart.CartProducts?.Select(cartProduct => new ProductDto
                {
                    ProductId = cartProduct.Product?.ProductId ?? 0,
                    Name = cartProduct.Product?.Name,
                    Description = cartProduct.Product?.Description,
                    Price = cartProduct.Product?.Price ?? 0m,
                    Quantity = cartProduct.Quantity
                })
            };
        }
    }
}
