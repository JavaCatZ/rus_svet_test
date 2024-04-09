package ru.russvet.restapi.model.dto.request.category;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект запроса на создание категории
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект запроса на создание категории")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CategoryCrReqDto(@Schema(description = "Наименование") @Size(max = 32) @NotBlank String name,
                               @Schema(description = "Краткое описание") @Size(max = 256) @NotBlank String shortDesc) {
}
