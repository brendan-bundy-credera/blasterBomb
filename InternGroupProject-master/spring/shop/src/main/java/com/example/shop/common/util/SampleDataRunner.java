package com.example.shop.common.util;

import com.example.shop.cart.Cart;
import com.example.shop.cart.CartItem;
import com.example.shop.common.constants.CartStatus;
import com.example.shop.item.Item;
import com.example.shop.item.ItemRepository;
import com.example.shop.cart.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class SampleDataRunner implements ApplicationRunner {

    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;

    @Autowired
    public SampleDataRunner(ItemRepository itemRepository, CartRepository cartRepository) {
        this.itemRepository = itemRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        Item item1 = itemRepository.save(new Item (
            "Sriracha",
            "The original Huy Fong sauce",
            3.00
        ));
        Item item2 = itemRepository.save(new Item (
            "Tabasco",
            "An American classic",
            5.99
        ));
        itemRepository.save(new Item (
            "Yellowbird Hot Sauce",
            "It's got a habanero kick",
            6.99
        ));

        Cart cart = new Cart();
        cart.setCartStatus(CartStatus.COMPLETE);
        ArrayList<CartItem> orderItems = new ArrayList<>();
        orderItems.add(new CartItem(cart, itemRepository.findById(1L).orElseThrow(), 3));
        orderItems.add(new CartItem(cart, itemRepository.findById(2L).orElseThrow(), 1));
        cart.setCartItems(orderItems);
        cartRepository.save(cart);
    }

}
