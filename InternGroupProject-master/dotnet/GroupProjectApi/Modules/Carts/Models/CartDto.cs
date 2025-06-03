using GroupProjectApi.Modules.Common.Entities;
using System;
using System.Collections.Generic;

namespace GroupProjectApi.Modules.Carts.Models
{
    public class CartDto
    {
        public int CartId { get; set; }
        public IEnumerable<ProductDto> Products { get; set; }
    }
}
