using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GroupProjectApi.Modules.Common.Attributes;
using GroupProjectApi.Modules.Carts.Models;
using GroupProjectApi.Modules.Common.Entities;
using Microsoft.EntityFrameworkCore;

namespace GroupProjectApi.Modules.Carts
{
    [TransientService]
    public class CartsRepository
    {
        private readonly ILogger<CartsRepository> _logger;
        private readonly GroupProjectDbContext _context;
        public CartsRepository(ILogger<CartsRepository> logger, GroupProjectDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public Cart GetCartById(int cartId)
        {
            return _context.Carts
                .Include(cart => cart.CartProducts)
                .ThenInclude(cartProduct => cartProduct.Product)
                .FirstOrDefault(cart => cart.CartId == cartId);
        }

    }
}
