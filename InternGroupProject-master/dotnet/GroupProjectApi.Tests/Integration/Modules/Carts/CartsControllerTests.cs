using FluentAssertions;
using GroupProjectApi.Modules.Carts.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace GroupProjectApi.Tests.Integration.Modules.Cart
{
    public class CartsControllerTests : IntegrationTest
    {
        [Fact]
        public async Task GetCart_ThreeItems_ReturnsCart()
        {
            // Arrange
            var cartId = 1;
            // Act
            var cartResponse = await _client.GetAsync($"/carts/{cartId}");
            // Assert
            cartResponse.StatusCode.Should().Be(HttpStatusCode.OK);
            var myCart = await cartResponse.Content.ReadFromJsonAsync<CartDto>();
            myCart.Products.Should().HaveCount(3);
        }
    }
}
