package ru.russvet.restapi.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Сущность таблицы категории
 * @since 23/03/2024
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @Size(max = 32)
    @NotBlank
    private String name;

    @Column(name = "short_desc")
    @Size(max = 256)
    @NotBlank
    private String shortDesc;
}
