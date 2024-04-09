package ru.russvet.restapi.exception;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Тело генерируемой Rest-ошибки
 * @since 23/03/2024
 */

@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RestException extends RuntimeException {
    private final ErrorType errorType;
    private final String message;

    public RestException(ErrorType errorType) {
        super();
        this.errorType = errorType;
        this.message = "";
    }

    public RestException(ErrorType errorType, String message) {
        super();
        this.errorType = errorType;
        this.message = message;
    }
}