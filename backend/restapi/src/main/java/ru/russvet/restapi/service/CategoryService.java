package ru.russvet.restapi.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.HibernateException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.russvet.restapi.exception.ErrorType;
import ru.russvet.restapi.exception.Exc;
import ru.russvet.restapi.mapper.CategoryMapper;
import ru.russvet.restapi.model.dto.request.category.CategoryCrReqDto;
import ru.russvet.restapi.model.dto.request.category.CategoryUpdReqDto;
import ru.russvet.restapi.model.dto.response.CategoryResDto;
import ru.russvet.restapi.model.entity.Category;
import ru.russvet.restapi.repository.CategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Bogdan Ch
 * @version 0.0.1
 * @apiNote Сервис для работы с категориями {@link Category}
 * @since 23/03/2024
 */

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    /**
     * @param dto ДТО-объект запроса на создание категории
     * @apiNote Создание категории
     */
    public void createCategory(CategoryCrReqDto dto) {
        try {
            if (!categoryRepository.existsByName(dto.name())) {
                Category newCategory = categoryMapper.toEntity(dto);
                categoryRepository.save(newCategory);
            } else {
                throw Exc.gen(ErrorType.RECORD_NOT_UNIQ_ERROR,
                        String.format("Категория с наименованием: %s уже существует", dto.name()));
            }
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param dto ДТО-объект запроса на изменение категории
     * @apiNote Изменение категории
     */
    @Transactional
    public void changeCategory(CategoryUpdReqDto dto) {
        try {
            if (!categoryRepository.existsByName(dto.name())) {
                Category category = categoryRepository.findById(dto.id()).orElseThrow(Exc.sup(ErrorType.CONTENT_NOT_FOUND,
                        String.format("Категории с id: %d не найдено", dto.id())));

                categoryMapper.updateCategory(category, dto);
                categoryRepository.save(category);
            } else {
                throw Exc.gen(ErrorType.RECORD_NOT_UNIQ_ERROR,
                        String.format("Категория с наименованием: %s уже существует", dto.name()));
            }
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param pageable объект с параметрами для постраничного вывода списка категорий
     * @return списка ДТО-объектов категорий
     * @apiNote Просмотр списка категорий постранично
     */
    public Page<CategoryResDto> getCategoriesPage(Pageable pageable) {
        try {
            return categoryRepository.findAll(pageable)
                    .map(categoryMapper::toDto);

        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @return спискок категорий
     * @apiNote Получение всех категорий
     */
    public List<CategoryResDto> getCategoriesList() {
        try {
            return categoryRepository.findAll()
                    .stream()
                    .map(categoryMapper::toDto)
                    .collect(Collectors.toList());

        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }

    /**
     * @param categoryId идентификатор удаляемой категории
     * @apiNote Удаление категории
     */
    @Transactional
    public void deleteCategory(Long categoryId) {
        try {
            if (categoryRepository.existsById(categoryId)) {
                categoryRepository.deactivateByCategoryId(categoryId);
                categoryRepository.deleteById(categoryId);
            } else {
                throw Exc.gen(ErrorType.CONTENT_NOT_FOUND, String.format("Категории с id: %d не найдено", categoryId));
            }
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
            throw Exc.gen(ErrorType.RS_DB_ERROR, ex.getLocalizedMessage());
        }
    }
}
