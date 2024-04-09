package ru.russvet.restapi.model.dto.request.product;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект запроса на создание продукта
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект запроса на создание продукта")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ProductCrReqDto(@Schema(description = "Наименование") @Size(max = 32) @NotBlank String name,
                              @Schema(description = "Описание") @Size(max = 512) @NotBlank String desc,
                              @Schema(description = "Цена") @NotNull Double price,
                              @Schema(description = "Идентификатор категории") @NotNull @Min(1) Long categoryId,
                              @Schema(description = "Статус (активен / не активен)") @NotNull Boolean status) {
}
