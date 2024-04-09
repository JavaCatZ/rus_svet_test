package ru.russvet.restapi.mapper;

import org.mapstruct.*;
import ru.russvet.restapi.model.dto.request.product.ProductCrReqDto;
import ru.russvet.restapi.model.dto.request.product.ProductUpdReqDto;
import ru.russvet.restapi.model.dto.response.ProductResDto;
import ru.russvet.restapi.model.entity.Product;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Маппер для работы с продуктами
 * @since 23/03/2024
 */

@Mapper(componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        uses = {
                CategoryMapper.class
        })
public interface ProductMapper {

    /**
     * @param dto ДТО-объект запроса на создание продукта
     * @return сущность продукта
     * @apiNote Формирует сущность продукта
     */
    Product toEntity(ProductCrReqDto dto);

    /**
     * @param product сущность продукта
     * @param dto     ДТО-объект запроса на обновление продукта
     * @apiNote Обновляет сущность продукта по полям dto
     */

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    void updateProduct(@MappingTarget Product product, ProductUpdReqDto dto);

    /**
     * @param product  сущность продукта
     * @param imageSrc ссылка на изображение
     * @return ДТО-объект просмотра продукта
     * @apiNote Формирует ДТО-объект просмотра продукта
     */
    @Mapping(target = "imageSrc", source = "imageSrc")
    @Mapping(target = "categoryDto", source = "product.category")
    ProductResDto toDto(Product product, String imageSrc);
}