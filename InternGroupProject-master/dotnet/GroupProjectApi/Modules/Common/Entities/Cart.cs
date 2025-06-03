using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProjectApi.Modules.Common.Entities
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        public ICollection<CartProduct> CartProducts { get; set; }
    }
}
