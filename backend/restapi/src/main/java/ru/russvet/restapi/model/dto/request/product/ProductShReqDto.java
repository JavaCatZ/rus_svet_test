package ru.russvet.restapi.model.dto.request.product;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект запроса на просмотр страницы продуктов
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект запроса на просмотр страницы продуктов")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ProductShReqDto(@Schema(description = "Идентификатор категории", minimum = "1") @Min(1) Long categoryId,
                              @Schema(description = "Наименование", minLength = 1, maxLength = 32) @Size(max = 32) String name,
                              @Schema(description = "Минимальная цена", defaultValue = "0") @Min(0) Double minPrice,
                              @Schema(description = "Максимальная цена") Double maxPrice) {
}
