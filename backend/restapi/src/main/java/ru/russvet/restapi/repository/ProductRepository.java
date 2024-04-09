package ru.russvet.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import ru.russvet.restapi.model.entity.Product;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Репозиторий для работы с продуктами {@link Product}
 * @since 23/03/2024
 */

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    boolean existsByName(String name);
}
