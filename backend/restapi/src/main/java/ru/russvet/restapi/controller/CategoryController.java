package ru.russvet.restapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import ru.russvet.restapi.model.dto.request.category.CategoryCrReqDto;
import ru.russvet.restapi.model.dto.request.category.CategoryUpdReqDto;
import ru.russvet.restapi.model.dto.response.CategoryResDto;
import ru.russvet.restapi.service.CategoryService;

import java.util.List;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Обработчик REST-запросов для категорий
 * @since 23/03/2024
 */

@RestController
@RequiredArgsConstructor
@Tag(name = "Categories", description = "Категории")
@RequestMapping(path = "/api/secured/category")
public class CategoryController {

    private final CategoryService categoryService;

    /**
     * @param dto ДТО-объект запроса на создание категории
     * @apiNote Создание категории
     */
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Создание категории")
    public void createCategory(@Parameter(description = "ДТО-объект запроса на создание категории", required = true)
                               @Valid @RequestBody CategoryCrReqDto dto) {
        categoryService.createCategory(dto);
    }

    /**
     * @param dto ДТО-объект запроса на изменение категории
     * @apiNote Изменение категории
     */
    @PutMapping("/change")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Изменение категории")
    public void changeCategory(@Parameter(description = "ДТО-объект запроса на изменение категории", required = true)
                               @Valid @RequestBody CategoryUpdReqDto dto) {
        categoryService.changeCategory(dto);
    }

    /**
     * @param pageable объект с параметрами для постраничного вывода списка категорий
     * @return списка ДТО-объектов категорий
     * @apiNote Просмотр списка категорий постранично
     */
    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Просмотр списка категорий постранично")
    public Page<CategoryResDto> categoriesPage(@Parameter(description = "Объект с параметрами для постраничного вывода",
            required = true)
                                               @ParameterObject @NotNull Pageable pageable) {
        return categoryService.getCategoriesPage(pageable);
    }

    /**
     * @return спискок категорий
     * @apiNote Получение всех категорий
     */
    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Просмотр списка всех категорий")
    public List<CategoryResDto> categoriesList() {
        return categoryService.getCategoriesList();
    }

    /**
     * @param id идентификатор удаляемой категории
     * @apiNote Удаление категории
     */
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Удаление категории")
    public void deleteCategory(@Parameter(description = "Идентификатор удаляемой категории", required = true)
                               @Param("id") Long id) {
        categoryService.deleteCategory(id);
    }
}
