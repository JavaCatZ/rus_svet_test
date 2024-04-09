package ru.russvet.restapi.mapper;

import org.mapstruct.*;
import ru.russvet.restapi.model.dto.request.category.CategoryCrReqDto;
import ru.russvet.restapi.model.dto.request.category.CategoryUpdReqDto;
import ru.russvet.restapi.model.dto.response.CategoryResDto;
import ru.russvet.restapi.model.entity.Category;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Маппер для работы с категориями
 * @since 23/03/2024
 */

@Mapper(componentModel = "spring",
        nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper {

    /**
     * @param dto ДТО-объект запроса на создание категории
     * @return сущность категории
     * @apiNote Формирует сущность категории
     */
    Category toEntity(CategoryCrReqDto dto);

    /**
     * @param category сущность категории
     * @param dto      ДТО-объект запроса на обновление категории
     * @apiNote Обновляет сущность категории по полям dto
     */
    @Mapping(target = "id", ignore = true)
    void updateCategory(@MappingTarget Category category, CategoryUpdReqDto dto);

    /**
     * @param category сущность категории
     * @return ДТО-объект просмотра категории
     * @apiNote Формирует ДТО-объект просмотра категории
     */
    CategoryResDto toDto(Category category);
}
