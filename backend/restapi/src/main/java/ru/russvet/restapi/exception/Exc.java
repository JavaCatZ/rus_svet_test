package ru.russvet.restapi.exception;

import java.util.function.Supplier;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Генератор Rest-ошибок
 * @since 23/03/2024
 */

public final class Exc {
    private Exc() {
    }

    /**
     * @param errorType тип ошибки из enum {@link ErrorType}
     * @return возвращает сгенерированную ошибку в обёртке Supplier
     * @apiNote Генерирует ошибку, указанного типа
     */
    public static Supplier<RestException> sup(ErrorType errorType) {
        return () -> Exc.gen(errorType);
    }

    /**
     * @param errorType тип ошибки из enum {@link ErrorType}
     * @param message   подробное описание ошибки
     * @return возвращает сгенерированную ошибку в обёртке Supplier
     * @apiNote Генерирует ошибку, указанного типа
     */
    public static Supplier<RestException> sup(ErrorType errorType, String message) {
        return () -> Exc.gen(errorType, message);
    }

    /**
     * @param errorType тип ошибки из enum {@link ErrorType}
     * @return возвращает сгенерированную ошибку
     * @apiNote Генерирует ошибку, указанного типа
     */
    public static RestException gen(ErrorType errorType) {
        return new RestException(errorType);
    }

    /**
     * @param errorType тип ошибки из enum {@link ErrorType}
     * @param message   подробное описание ошибки
     * @return возвращает сгенерированную ошибку
     * @apiNote Генерирует ошибку, указанного типа
     */
    public static RestException gen(ErrorType errorType, String message) {
        return new RestException(errorType, message);
    }
}
