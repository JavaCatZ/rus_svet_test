package ru.russvet.restapi.model.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект ответа на запрос просмотра категории
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект ответа на запрос просмотра категории")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CategoryResDto(@Schema(description = "Идентификатор категории") Long id,
                             @Schema(description = "Наименование") String name,
                             @Schema(description = "Краткое описание") String shortDesc) {
}
