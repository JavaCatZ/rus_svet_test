package ru.russvet.restapi.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.*;
import io.swagger.v3.oas.models.info.Info;

import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Конфигурация Swagger
 * @since 23/03/2024
 */

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI(@Value("${info.app.version}") String appVersion) {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat(
                                        "JWT"))
                )
                .addSecurityItem(
                        new SecurityRequirement().addList("bearerAuth")
                )
                .info(new Info().title("API RusSvet").description("API для сайта Русский свет").version(appVersion));
    }
}