package ru.russvet.restapi.exception;

import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.charset.StandardCharsets;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Перехватчик Rest-ошибок
 * @since 23/03/2024
 */

@Slf4j
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * @param ex сгенерированная Rest-ошибка
     * @return оформленное тело ответа с ошибкой
     * @apiNote Генерирует тело ответа на основе Rest-ошибки
     */
    @ExceptionHandler(RestException.class)
    public ResponseEntity<ErrorMessage> handleRestException(RestException ex) {

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.add(HttpHeaders.CONTENT_ENCODING, StandardCharsets.UTF_8.name());

        final String errorMsg = ex.getErrorType().getMessage() + (ex.getMessage().isEmpty() ? "" : ": " + ex.getMessage());

        return new ResponseEntity<>(ErrorMessage.builder()
                .errorCode(ex.getErrorType().getErrorCode())
                .message(errorMsg)
                .build(), headers, ex.getErrorType().getStatus());
    }

    /**
     * @param ex ошибка ограничения
     * @return ответ с ошибкой
     * @apiNote Перехватчик ошибок ограничений на полях ДТО
     */
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorMessage> handleValidationException(ConstraintViolationException ex) {

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        headers.add(HttpHeaders.CONTENT_ENCODING, StandardCharsets.UTF_8.name());

        final String errorMsg = ex.getLocalizedMessage();

        return new ResponseEntity<>(ErrorMessage.builder()
                .errorCode(ErrorType.INCORRECT_REQUEST_ERROR.getErrorCode())
                .message(errorMsg)
                .build(), headers, ErrorType.INCORRECT_REQUEST_ERROR.getStatus());
    }

    /**
     * @param ex      ошибка неверного аргумента
     * @param headers заголовки
     * @param status  статус
     * @param request запрос
     * @return ответ с ошибкой
     * @apiNote Перехватчик ошибок неверных аргументов
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        return new ResponseEntity<>(ErrorMessage.builder()
                .errorCode(ErrorType.INCORRECT_REQUEST_ERROR.getErrorCode())
                .message(ErrorType.INCORRECT_REQUEST_ERROR.getMessage())
                .build(), HttpStatusCode.valueOf(ErrorType.INCORRECT_REQUEST_ERROR.getStatus().value()));
    }

    /**
     * @param ex      ошибка невозможности чтения запроса
     * @param headers заголовки
     * @param status  статус
     * @param request запрос
     * @return ответ с ошибкой
     * @apiNote Перехватчик ошибок невозможности чтения запроса
     */
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatusCode status,
                                                                  WebRequest request) {
        return new ResponseEntity<>(ErrorMessage.builder()
                .errorCode(ErrorType.INCORRECT_REQUEST_ERROR.getErrorCode())
                .message(ErrorType.INCORRECT_REQUEST_ERROR.getMessage())
                .build(), HttpStatusCode.valueOf(ErrorType.INCORRECT_REQUEST_ERROR.getStatus().value()));
    }

    /**
     * @param ex      ошибка отсутствия параметров в запросе
     * @param headers заголовки
     * @param status  статус
     * @param request запрос
     * @return ответ с ошибкой
     * @apiNote Перехватчик ошибок отсутствия параметров в запросе
     */
    @Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                                                                          HttpHeaders headers,
                                                                          HttpStatusCode status,
                                                                          WebRequest request) {
        return new ResponseEntity<>(ErrorMessage.builder()
                .errorCode(ErrorType.INCORRECT_REQUEST_ERROR.getErrorCode())
                .message(ErrorType.INCORRECT_REQUEST_ERROR.getMessage())
                .build(), HttpStatusCode.valueOf(ErrorType.INCORRECT_REQUEST_ERROR.getStatus().value()));
    }
}
