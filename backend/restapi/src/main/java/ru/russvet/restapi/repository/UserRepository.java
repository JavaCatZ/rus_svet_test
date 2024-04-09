package ru.russvet.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.russvet.restapi.model.entity.User;

import java.util.Optional;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Репозиторий для работы с пользователями {@link User}
 * @since 23/03/2024
 */

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String name);
}
