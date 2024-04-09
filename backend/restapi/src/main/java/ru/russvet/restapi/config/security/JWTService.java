package ru.russvet.restapi.config.security;

import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Сервис работы с JWT токеном
 * @since 23/03/2024
 */

@Service
public class JWTService {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    /**
     * @param authentication объект аутентификации
     * @return JWT токен
     * @apiNote Генерирует JWT токен
     */
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + RsSecurityConstants.JWT_EXPIRATION);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    /**
     * @param jwtToken JWT токен
     * @return имя пользователя
     * @apiNote Возвращает имя пользователя по JWT токену
     */
    public String getUsernameFromJWT(String jwtToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
        return claims.getSubject();
    }

    /**
     * @param token JWT токен
     * @return результат проверки
     * @apiNote Проверяет JWT токен
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            throw Exc.gen(ErrorType.TOKEN_INVALID_OR_EXPIRED_ERROR);
        }
    }


}
