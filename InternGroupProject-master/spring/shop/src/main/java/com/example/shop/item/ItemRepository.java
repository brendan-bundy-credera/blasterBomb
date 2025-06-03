package com.example.shop.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    /* NOTE: by extending JpaRepository, we "automagically" get some
        basic DB CRUD functionalities built in. See JPA docs for details.
        TODO: add any needed custom repository methods
     */
}
