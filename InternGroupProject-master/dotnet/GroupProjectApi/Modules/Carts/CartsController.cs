using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroupProjectApi.Modules.Carts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace GroupProjectApi.Modules.Carts
{
    [ApiController]
    [Route("[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ILogger<CartsController> _logger;
        private readonly CartsService _cartService;

        public CartsController(ILogger<CartsController> logger, CartsService cartService)
        {
            _logger = logger;
            _cartService = cartService;
        }

        [HttpGet("{cartId}")]
        public ActionResult<CartDto> GetCartById(int cartId)
        {
            _logger.LogInformation($"Retrieving cart (cartId: {cartId})");
            var cart = _cartService.GetCart(cartId);
            if (cart == null)
            {
                return this.NotFound();
            }
            return this.Ok(cart);
        }

    }
        
}
