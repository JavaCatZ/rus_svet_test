package ru.russvet.restapi.service;

import io.minio.errors.MinioException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.HibernateException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;
import ru.russvet.restapi.mapper.ProductMapper;
import ru.russvet.restapi.model.dto.request.product.ProductCrReqDto;
import ru.russvet.restapi.model.dto.request.product.ProductShReqDto;
import ru.russvet.restapi.model.dto.request.product.ProductUpdReqDto;
import ru.russvet.restapi.model.dto.response.ProductResDto;
import ru.russvet.restapi.model.entity.Category;
import ru.russvet.restapi.model.entity.Product;
import ru.russvet.restapi.repository.CategoryRepository;
import ru.russvet.restapi.repository.ProductRepository;
import ru.russvet.restapi.repository.specification.ProductSpecification;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Сервис для работы с продуктами {@link Product}
 * @since 23/03/2024
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final MinioService minioService;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    /**
     * @param dto       ДТО-объект запроса на создание продукта
     * @param imageFile изображение продукта
     * @apiNote Создание продукта
     */
    public void createProduct(ProductCrReqDto dto, MultipartFile imageFile) {

        try {
            if (!productRepository.existsByName(dto.name())) {
                Product newProduct = productMapper.toEntity(dto);

                Category category = categoryRepository.findById(dto.categoryId())
                        .orElseThrow(Exc.sup(ErrorType.CONTENT_NOT_FOUND,
                                String.format("Категории с id: %d не найдено", dto.categoryId())));
                newProduct.setCategory(category);

                String fileName = minioService.saveImage(imageFile);
                newProduct.setImageFileName(fileName);

                productRepository.save(newProduct);
            } else {
                throw Exc.gen(ErrorType.RECORD_NOT_UNIQ_ERROR,
                        String.format("Продукт с наименованием: %s уже существует", dto.name()));
            }
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param dto       ДТО-объект запроса на изменение продукта
     * @param imageFile изображение продукта
     * @apiNote Изменение продукта
     */
    @Transactional
    public void changeProduct(ProductUpdReqDto dto, MultipartFile imageFile) {
        try {
            if (!productRepository.existsByName(dto.name())) {
                Product product = productRepository.findById(dto.id()).orElseThrow(Exc.sup(ErrorType.CONTENT_NOT_FOUND,
                        String.format("Продукта с id: %d не найдено", dto.id())));

                productMapper.updateProduct(product, dto);

                if (!product.getCategory().getId().equals(dto.categoryId())) {
                    Category category = categoryRepository.findById(dto.id()).orElseThrow(Exc.sup(ErrorType.CONTENT_NOT_FOUND,
                            String.format("Категории с id: %d не найдено", dto.categoryId())));
                    product.setCategory(category);
                }

                if (imageFile != null) {
                    if (!product.getImageFileName().equals(imageFile.getOriginalFilename())) {
                        String fileName = minioService.updateImage(imageFile, product.getImageFileName());
                        product.setImageFileName(fileName);
                    }
                }

                productRepository.save(product);
            } else {
                throw Exc.gen(ErrorType.RECORD_NOT_UNIQ_ERROR,
                        String.format("Продукт с наименованием: %s уже существует", dto.name()));
            }
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param dto      ДТО-объект с параметрами для фильтрации списка продуктов
     * @param pageable объект с параметрами для постраничного вывода списка продуктов
     * @return список ДТО-объектов продуктов
     * @apiNote Просмотр списка продуктов постранично
     */
    public Page<ProductResDto> getProductsPage(ProductShReqDto dto, Pageable pageable) {
        try {
            Specification<Product> spec = ProductSpecification.createSpecificationByParams(dto);
            return productRepository.findAll(spec, pageable)
                    .map((product) -> productMapper.toDto(product, minioService.getImageSrc(product.getImageFileName())));
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR);
        }
    }

    /**
     * @param productId идентификатор удаляемого продукта
     * @apiNote Удаление продукта
     */
    @Transactional
    public void deleteProduct(Long productId) {
        try {
            Product product = productRepository.findById(productId)
                    .orElseThrow(Exc.sup(ErrorType.CONTENT_NOT_FOUND, String.format("Продукта с id: %d не найдено",
                            productId)));

            minioService.deleteImage(product.getImageFileName());
            productRepository.deleteById(productId);
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        } catch (MinioException ex) {
            throw Exc.gen(ErrorType.MINIO_ERROR, ex.getLocalizedMessage());
        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException ex) {
            throw Exc.gen(ErrorType.SERVER_ERROR, ex.getLocalizedMessage());
        }
    }
}
