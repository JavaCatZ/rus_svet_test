package ru.russvet.restapi.model.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote ДТО-объект ответа на запрос авторизации пользователя
 * @since 23/03/2024
 */

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserAuthResDto {

    @NotBlank
    private String userName;

    @NotBlank
    private List<String> roles;

    @NotBlank
    private String jwtToken;
}
