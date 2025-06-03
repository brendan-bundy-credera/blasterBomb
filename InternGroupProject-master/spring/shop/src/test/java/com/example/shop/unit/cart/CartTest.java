package com.example.shop.unit.cart;

import com.example.shop.cart.Cart;
import com.example.shop.cart.CartItem;
import com.example.shop.item.Item;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class CartTest {

	@Test
	void subtotalTest() {
		Cart cart = new Cart();
		CartItem cartItem = new CartItem(cart, new Item("Test Item 1", "First test item", 3.0), 5);

		cart.addCartItem(cartItem);

		double actualSubtotal = cart.getSubtotal();
		Assertions.assertEquals(15.0, actualSubtotal);
	}
}
