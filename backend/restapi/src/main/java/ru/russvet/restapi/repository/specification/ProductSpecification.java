package ru.russvet.restapi.repository.specification;

import lombok.experimental.UtilityClass;
import org.springframework.data.jpa.domain.Specification;
import ru.russvet.restapi.model.dto.request.product.ProductShReqDto;
import ru.russvet.restapi.model.entity.Product;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Спецификация для фильтрации продуктов
 * @since 23/03/2024
 */

@UtilityClass
public class ProductSpecification {

    /**
     * Создаёт спецификацию продуктов
     *
     * @param condition ДТО-объект условий фильтрации продуктов
     * @return спецификация
     */
    public Specification<Product> createSpecificationByParams(ProductShReqDto condition) {
        return Specification.where(isCategoryIdEqual(condition.categoryId()))
                .and(isNameLike(condition.name())
                        .and(isPriceBetween(condition.minPrice(), condition.maxPrice())));
    }

    /**
     * Проверяет на совпадение по идентификатору продукта
     *
     * @param categoryId идентификатор продукта
     * @return спецификация продукта
     */
    private static Specification<Product> isCategoryIdEqual(Long categoryId) {
        return categoryId == null ? (root, query, builder) -> builder.conjunction() :
                (root, query, builder) -> builder.equal(root.get("category").get("id"), categoryId);
    }

    /**
     * Проверяет на совпадение по наименованию продукта
     *
     * @param name наименование продукта
     * @return спецификация продукта
     */
    private static Specification<Product> isNameLike(String name) {
        return name == null ? (root, query, builder) -> builder.conjunction() :
                (root, query, builder) -> builder.like(root.get("name"), "%" + name + "%");
    }

    /**
     * Проверяет на попадание цены продукта в промежуток
     *
     * @param minPrice минимальная цена продукта
     * @param maxPrice максимальная цена продукта
     * @return спецификация продукта
     */
    private static Specification<Product> isPriceBetween(Double minPrice, Double maxPrice) {
        return maxPrice == null ? (root, query, builder) -> builder.gt(root.get("price"), minPrice) :
                (root, query, builder) -> builder.between(root.get("price"), minPrice, maxPrice);
    }
}
