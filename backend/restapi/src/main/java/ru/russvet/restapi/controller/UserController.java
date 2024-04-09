package ru.russvet.restapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.russvet.restapi.model.dto.request.user.UserAuthReqDto;
import ru.russvet.restapi.model.dto.response.UserAuthResDto;
import ru.russvet.restapi.service.UserService;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Обработчик REST-запросов для пользователей
 * @since 23/03/2024
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "Users", description = "Пользователи")
@RequestMapping("/api/public/user")
public class UserController {

    private final UserService userService;

    /**
     * @param dto ДТО-объект запроса на авторизацию пользователя
     * @return JWT токен
     * @apiNote Авторизация пользователя
     */
    @PostMapping(path = "/auth",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Авторизация пользователя")
    public UserAuthResDto authUser(@Parameter(description = "ДТО-объект запроса на авторизацию пользователя", required = true)
                                   @Valid @RequestBody UserAuthReqDto dto) {
        return userService.authUser(dto);
    }

    /**
     * @param jwtToken JWT токен
     * @return результат проверки
     * @apiNote Проверка валидности JWT токена
     */
    @PostMapping(path = "/validate-token")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Авторизация пользователя")
    public boolean validateJwtToken(@Parameter(description = "JWT токен", required = true)
                                    @RequestParam("jwt_token") @NotBlank String jwtToken) {
        return userService.validateJwtToken(jwtToken);
    }
}
