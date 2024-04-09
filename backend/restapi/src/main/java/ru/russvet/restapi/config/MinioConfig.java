package ru.russvet.restapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.minio.MinioClient;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Конфигурация Minio
 * @since 23/03/2024
 */

@Configuration
public class MinioConfig {

    @Value("${minio.access.name}")
    String key;
    @Value("${minio.access.pass}")
    String pass;
    @Value("${minio.url}")
    String minioUrl;

    @Bean
    public MinioClient generateMinioClient() {
        try {
            return MinioClient.builder()
                    .endpoint(minioUrl)
                    .credentials(key, pass)
                    .build();
        } catch (Exception ex) {
            throw Exc.gen(ErrorType.MINIO_ERROR, "Ошибка настройки клиента Minio");
        }
    }
}