package ru.russvet.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.russvet.restapi.model.entity.Category;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Репозиторий для работы с категориями {@link Category}
 * @since 23/03/2024
 */

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);

    @Modifying
    @Query("UPDATE Product p SET p.status = false, p.category = null WHERE p.category.id = :categoryId")
    void deactivateByCategoryId(@Param("categoryId") Long categoryId);
}
