package com.example.shop.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartController {

    // Field based injection
    @Autowired
    private CartService cartService;

    @GetMapping("/cart/{id}")
    public ResponseEntity<Cart> getCartById(@PathVariable(value = "id") long cartId) {
        Cart cart = cartService.getCartById(cartId);

        if (cart == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cart);
    }
}
