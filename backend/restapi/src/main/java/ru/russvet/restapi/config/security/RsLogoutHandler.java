package ru.russvet.restapi.config.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Обработчик выхода из учётной записи пользователя
 * @since 23/03/2024
 */

@Service
public class RsLogoutHandler implements LogoutHandler {

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith(RsSecurityConstants.BEARER_PREFIX)) {
            return;
        }
        SecurityContextHolder.clearContext();
    }
}
