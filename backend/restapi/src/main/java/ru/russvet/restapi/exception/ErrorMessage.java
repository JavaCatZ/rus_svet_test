package ru.russvet.restapi.exception;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Тело Rest-ошибки
 * @since 23/03/2024
 */

@Data
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ErrorMessage {

    private Integer errorCode;

    private String message;
}