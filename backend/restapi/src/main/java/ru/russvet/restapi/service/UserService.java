package ru.russvet.restapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.russvet.restapi.config.security.JWTService;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;
import ru.russvet.restapi.model.dto.request.user.UserAuthReqDto;
import ru.russvet.restapi.model.dto.response.UserAuthResDto;
import ru.russvet.restapi.model.entity.User;
import ru.russvet.restapi.model.entity.UserRole;
import ru.russvet.restapi.repository.UserRepository;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Спецификация для фильтрации продуктов
 * @since 23/03/2024
 */

@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final UserRepository userRepository;

    /**
     * @param dto ДТО объект с логином и паролем пользователя
     * @return ДТО объект с данными авторизованного пользователя
     * @apiNote Авторизация пользователя
     */
    public UserAuthResDto authUser(UserAuthReqDto dto) {

        User user = userRepository.findByUsername(dto.name()).orElseThrow(Exc.sup(ErrorType.USER_NOT_FOUND));

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.name(),
                        dto.pass()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtService.generateToken(authentication);
        return UserAuthResDto
                .builder()
                .userName(user.getUsername())
                .roles(user.getRoles()
                        .stream()
                        .map(UserRole::getName)
                        .toList())
                .jwtToken(token)
                .build();
    }

    /**
     * @param jwtToken JWT токен
     * @return результат проверки
     * @apiNote Проверяет валидность токена пользователя
     */
    public boolean validateJwtToken(String jwtToken) {

        return jwtService.validateToken(jwtToken);
    }

}
