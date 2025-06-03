package com.example.shop.cart;

import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class CartService {

    private final CartRepository cartRepository;

    // constructor based injection
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart getCartById(long id) {
        return cartRepository.findById(id).orElse(null);
    }

    @Transactional
    public Cart createCart() {
        Cart newCart = new Cart();
        return cartRepository.save(newCart);
    }
}
