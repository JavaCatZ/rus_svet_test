package ru.russvet.restapi.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Константы типов Rest-ошибок
 * @since 23/03/2024
 */

@Getter
@AllArgsConstructor
public enum ErrorType {

    INCORRECT_REQUEST_ERROR(HttpStatus.BAD_REQUEST, 10000, "Некорректный запрос"),
    AUTH_ERROR(HttpStatus.UNAUTHORIZED, 10001, "Неправильный логин или пароль"),
    NOT_AUTHORIZED_ERROR(HttpStatus.UNAUTHORIZED, 10002, "Необходима авторизация"),
    TOKEN_INVALID_OR_EXPIRED_ERROR(HttpStatus.UNAUTHORIZED, 10003, "JWT токен не валиден или его срок жизни истек"),

    CONTENT_NOT_FOUND(HttpStatus.NOT_FOUND, 10101, "Отсутствуют данные"),
    RECORD_NOT_UNIQ_ERROR(HttpStatus.CONFLICT, 10102, "Запись не уникальна"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 10103, "Пользователь не зарегистрирован"),

    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 10201, "Внутренняя ошибка сервера"),
    RS_DB_ERROR(HttpStatus.SERVICE_UNAVAILABLE, 10202, "Ошибка RusSvet DB"),
    DATA_FORMAT_ERROR(HttpStatus.SERVICE_UNAVAILABLE, 10203, "Формат данных некорректный"),
    MINIO_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 10204, "Внутренняя ошибка сервера, " +
            "недоступно хранилище изображений");

    private final HttpStatus status;
    private final Integer errorCode;
    private final String message;
}
