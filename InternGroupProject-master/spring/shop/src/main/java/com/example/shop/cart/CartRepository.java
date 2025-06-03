package com.example.shop.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    /* NOTE: by extending JpaRepository, we "automagically" get some
        basic DB CRUD functionalities built in. See JPA docs for details.
        TODO: add any needed custom repository methods
     */
}
