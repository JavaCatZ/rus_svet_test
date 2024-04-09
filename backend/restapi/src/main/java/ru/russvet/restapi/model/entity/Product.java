package ru.russvet.restapi.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Сущность таблицы продукта
 * @since 23/03/2024
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    @Size(max = 32)
    @NotBlank
    private String name;

    @Column(name = "full_desc")
    @NotBlank
    private String desc;

    @Column(name = "price")
    @NotNull
    private Double price;

    @Column(name = "image_file_name")
    @NotBlank
    private String imageFileName;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @CreationTimestamp
    @Column(name = "create_date")
    private Timestamp createDate;

    @Column(name = "status")
    @NotNull
    private Boolean status;
}