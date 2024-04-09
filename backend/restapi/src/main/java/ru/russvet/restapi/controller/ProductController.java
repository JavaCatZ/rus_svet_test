package ru.russvet.restapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.russvet.restapi.model.dto.request.product.ProductCrReqDto;
import ru.russvet.restapi.model.dto.request.product.ProductShReqDto;
import ru.russvet.restapi.model.dto.request.product.ProductUpdReqDto;
import ru.russvet.restapi.model.dto.response.ProductResDto;
import ru.russvet.restapi.service.ProductService;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Обработчик REST-запросов для продуктов
 * @since 23/03/2024
 */

@RestController
@RequiredArgsConstructor
@Tag(name = "Products", description = "Продукты")
@RequestMapping(path = "/api/secured/product")
public class ProductController {

    private final ProductService productService;

    /**
     * @param dto ДТО-объект запроса на создание продукта
     * @apiNote Создание продукта
     */
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Создание продукта")
    public void createProduct(@Parameter(description = "ДТО-объект запроса на создание продукта",
            schema = @Schema(name ="dto", type = MediaType.APPLICATION_JSON_VALUE, format = "object"), required = true)
                              @NotNull
                              @RequestPart("dto") ProductCrReqDto dto,
                              @Parameter(description = "Изображение продукта", required = true)
                              @NotNull
                              @RequestPart("image_file") MultipartFile imageFile) {
        productService.createProduct(dto, imageFile);
    }

    /**
     * @param dto ДТО-объект запроса на изменение продукта
     * @apiNote Изменение продукта
     */
    @PutMapping(path = "/change", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Изменение продукта")
    public void changeProduct(@Parameter(description = "ДТО-объект запроса на изменение продукта",
            schema = @Schema(name ="dto", type = MediaType.APPLICATION_JSON_VALUE, format = "object"), required = true)
                              @RequestPart("dto") ProductUpdReqDto dto,
                              @Parameter(description = "Изображение продукта")
                              @RequestPart("image_file") MultipartFile imageFile) {
        productService.changeProduct(dto, imageFile);
    }

    /**
     * @param dto      ДТО-объект с параметрами для фильтрации списка продуктов
     * @param pageable объект с параметрами для постраничного вывода списка продуктов
     * @return списка ДТО-объектов продуктов
     * @apiNote Просмотр списка продуктов постранично
     */
    @GetMapping("/list")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Просмотр списка продуктов постранично")
    public Page<ProductResDto> productsPage(@Parameter(description = "ДТО-объект с параметрами для фильтрации списка продуктов")
                                            @ParameterObject ProductShReqDto dto,
                                            @Parameter(description = "Объект с параметрами для постраничного вывода",
                                                    required = true)
                                            @ParameterObject @NotNull Pageable pageable) {
        return productService.getProductsPage(dto, pageable);
    }

    /**
     * @param id идентификатор удаляемого продукта
     * @apiNote Удаление продукта
     */
    @DeleteMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Удаление продукта")
    public void deleteCategory(@Parameter(description = "Идентификатор удаляемого продукта", required = true)
                               @Param("id") Long id) {
        productService.deleteProduct(id);
    }
}
