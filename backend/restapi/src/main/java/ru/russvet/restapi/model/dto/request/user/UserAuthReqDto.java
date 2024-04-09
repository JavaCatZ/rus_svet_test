package ru.russvet.restapi.model.dto.request.user;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект запроса на авторизацию пользователя
 * @since 23/03/2024
 */

@Schema(description = "ДТО-объект запроса на авторизацию пользователя")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record UserAuthReqDto(@Schema(description = "Логин") @Size(max = 32) @NotBlank String name,
                              @Schema(description = "Пароль") @Size(max = 12) @NotBlank String pass) {
}
