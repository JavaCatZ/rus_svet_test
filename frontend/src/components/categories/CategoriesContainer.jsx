/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import TitleRow from "Components/base/TitleRow";
import CategoriesHeaderBlock from "Components/categories/CategoriesHeaderBlock";
import CategoryRowBlock from "Components/categories/CategoryRowBlock";
import PaginationBlock from "Components/base/blocks/PaginationBlock";
import Preloader from "Components/base/blocks/Preloader";
import { getCategoriesPage } from "Store/categoriesSlice";
import ModalBlock from "Components/base/blocks/ModalBlock";
import CategoryForm from "Components/categories/CategoryForm";
import ErrorBlock from "Components/base/blocks/ErrorBlock";
import { getBearerAuthFields, getBaseFields } from "Utils/RestFieldsUtils";
import { getViewCategoriesCountByRes } from "Utils/ScreenUtils";
import { REST_STATUSES, deleteCategory } from "Api/Api";
import { getAccessTokenFromCache } from "Utils/CacheUtils";
import { showSuccessMessage, showErrorMessage } from "Utils/MessageUtils";
import { MODE_TYPE } from "Constants/Base";

function CategoriesContainer() {
  const accessToken = getAccessTokenFromCache();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const size = useMemo(() => getViewCategoriesCountByRes(), []);
  const [categoryModal, setCategoryModal] = useState({
    category: null,
    showModal: false,
    modalMode: null,
  });
  const { status, error, categoriesList, categoriesCount } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    loadCategories();
  }, [page]);

  const onShowCategory = (category, mode) => {
    setCategoryModal({ category, showModal: true, modalMode: mode });
  };

  const loadCategories = () => {
    const requestFields = getBaseFields({
      page,
      size,
      accessToken,
    });
    dispatch(getCategoriesPage(requestFields));
  };

  const closeModal = (state) => {
    setCategoryModal(state);
    loadCategories();
  };

  const deleteCategoryById = (id) => {
    deleteCategory(getBearerAuthFields(accessToken), id)
      .then(() => {
        showSuccessMessage(`Категория с id: ${id} успешно удалена`);
        loadProducts();
      })
      .catch((error) =>
        showErrorMessage(`Ошибка уделения категории: ${error.message}`)
      );
  };

  return (
    <>
      <TitleRow titleText={"Категории"} showCallback={onShowCategory} />
      <CategoriesHeaderBlock />
      {status === REST_STATUSES.LOADING ? (
        <Preloader />
      ) : (
        <motion.Fragment
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {error && <ErrorBlock textValue={error.message} />}
          {categoriesList &&
            categoriesList.length > 0 &&
            categoriesList.map((category) => (
              <CategoryRowBlock
                key={category.id}
                category={category}
                showCallback={onShowCategory}
                deleteCallback={deleteCategoryById}
              />
            ))}
        </motion.Fragment>
      )}
      {categoriesCount > size ? (
        <PaginationBlock
          page={page}
          size={size}
          count={categoriesCount}
          callback={setPage}
        />
      ) : null}
      {(categoryModal.category ||
        categoryModal.modalMode === MODE_TYPE.CREATE) && (
        <ModalBlock
          open={categoryModal.showModal}
          content={
            <CategoryForm
              category={categoryModal.category}
              closeCallback={closeModal}
              mode={categoryModal.modalMode}
            />
          }
        />
      )}
    </>
  );
}

export default CategoriesContainer;
