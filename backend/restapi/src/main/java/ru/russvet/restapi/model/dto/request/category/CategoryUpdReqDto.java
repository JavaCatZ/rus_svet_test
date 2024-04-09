package ru.russvet.restapi.model.dto.request.category;

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
 * @apiNote ДТО-объект запроса на изменение категории
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект запроса на изменение категории")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CategoryUpdReqDto(@Schema(description = "Идентификатор категории") @Min(1) @NotNull Long id,
                                @Schema(description = "Наименование") @Size(max = 32) @NotBlank String name,
                                @Schema(description = "Краткое описание") @Size(max = 256) @NotBlank String shortDesc) {
}
