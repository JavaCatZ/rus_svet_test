package ru.russvet.restapi.model.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;

import java.sql.Timestamp;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект ответа на запрос просмотра продукта
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект ответа на запрос просмотра продукта")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ProductResDto(@Schema(description = "Идентификатор продукта") Long id,
                            @Schema(description = "Наименование") String name,
                            @Schema(description = "Описание") String desc, @Schema(description = "Цена") Double price,
                            @Schema(description = "Ссылка на изображение") String imageSrc,
                            @Schema(description = "ДТО-объект просмотра категории") CategoryResDto categoryDto,
                            @Schema(description = "Дата добавления в каталог") Timestamp createDate,
                            @Schema(description = "Статус (активен / не активен)") Boolean status) {
}
