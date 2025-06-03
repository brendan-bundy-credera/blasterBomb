package com.example.shop.integration.cart;

import com.example.shop.cart.Cart;
import com.example.shop.cart.CartService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CartServiceIT {

	@Autowired
	CartService cartService;

	@Test
	void createCartIT() {
		Cart cart = cartService.createCart();

		Assertions.assertNotNull(cart);
		Assertions.assertTrue(cart.getId() >= 0);
		Assertions.assertFalse(cart.getCartItems().size() > 0);
	}

}
