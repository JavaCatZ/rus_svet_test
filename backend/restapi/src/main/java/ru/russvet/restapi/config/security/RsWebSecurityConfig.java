package ru.russvet.restapi.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import ru.russvet.restapi.constants.UserRoleType;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Конфигурация безопасности для всех http запросов
 * @since 23/03/2024
 */

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class RsWebSecurityConfig {

    private final JWTFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    private static final String[] WHITE_LIST_URL = {
            "/api/public/**",
            "/open-api-docs",
            "/open-api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

    private static final String SECURED_URLS = "/api/secured/**";

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        try {
            http.csrf(AbstractHttpConfigurer::disable)
                    .authorizeHttpRequests(req ->
                            req.requestMatchers(WHITE_LIST_URL)
                                    .permitAll()
                                    .requestMatchers(HttpMethod.POST, SECURED_URLS).hasAnyRole(UserRoleType.ADMIN.name())
                                    .requestMatchers(HttpMethod.PUT, SECURED_URLS).hasAnyRole(UserRoleType.ADMIN.name())
                                    .requestMatchers(HttpMethod.DELETE, SECURED_URLS).hasAnyRole(UserRoleType.ADMIN.name())
                                    .anyRequest()
                                    .authenticated()
                    )
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authenticationProvider(authenticationProvider)
                    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                    .logout(logout ->
                            logout.logoutUrl("/api/user/logout")
                                    .addLogoutHandler(logoutHandler)
                                    .logoutSuccessHandler((request, response, authentication) -> response
                                            .setStatus(HttpStatus.OK.value())))
                    .exceptionHandling(eh -> eh.authenticationEntryPoint((request, response, authException) -> {
                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                        Map<String, Object> body = new HashMap<>();
                        body.put("error_code", ErrorType.AUTH_ERROR.getErrorCode());
                        body.put("message", ErrorType.AUTH_ERROR.getMessage());

                        ObjectMapper objectMapper = new ObjectMapper();
                        objectMapper.writeValue(response.getOutputStream(), body);
                    }));

            return http.build();
        } catch (Exception ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.SERVER_ERROR, ex.getLocalizedMessage());
        }
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(false);
        config.setAllowedOrigins(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("*"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
