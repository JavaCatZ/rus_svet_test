/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import TitleRow from "Components/base/TitleRow";
import ProductsHeaderBlock from "Components/products/ProductsHeaderBlock";
import ProductsFiltersBlock from "Components/products/ProductsFiltersBlock";
import ProductRowBlock from "Components/products/ProductRowBlock";
import PaginationBlock from "Components/base/blocks/PaginationBlock";
import Preloader from "Components/base/blocks/Preloader";
import { getProductsPage } from "Store/productsSlice";
import ModalBlock from "Components/base/blocks/ModalBlock";
import ProductForm from "Components/products/ProductForm";
import ErrorBlock from "Components/base/blocks/ErrorBlock";
import { getBearerAuthFields, getFieldsWithFilters } from "Utils/RestFieldsUtils";
import { getViewProductsCountByRes } from "Utils/ScreenUtils";
import { REST_STATUSES, deleteProduct } from "Api/Api";
import { getAccessTokenFromCache } from "Utils/CacheUtils";
import { showSuccessMessage, showErrorMessage } from "Utils/MessageUtils";
import { MODE_TYPE } from "Constants/Base";

function ProductsContainer() {
  const accessToken = getAccessTokenFromCache();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState("&minPrice=0");
  const size = useMemo(() => getViewProductsCountByRes(), []);

  const [productModal, setProductModal] = useState({
    product: null,
    showModal: false,
    modalMode: null,
  });

  const { status, error, productsList, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    loadProducts();
  }, [page, filters]);

  const onShowProduct = (product, mode) => {
    setProductModal({ product, showModal: true, modalMode: mode });
  };

  const loadProducts = () => {
    const requestFields = getFieldsWithFilters({
      page,
      size,
      accessToken,
      filters,
    });
    dispatch(getProductsPage(requestFields));
  };

  const closeModal = (state) => {
    setProductModal(state);
    loadProducts();
  };

  const deleteProductById = (id) => {
    deleteProduct(getBearerAuthFields(accessToken), id)
      .then(() => {
        showSuccessMessage(`Продукт с id: ${id} успешно удалён`);
        loadProducts();
      })
      .catch((error) =>
        showErrorMessage(`Ошибка уделения продукта: ${error.message}`)
      );
  };

  const onFiltersChange = (values) => {
    setFilters(values);
  }

  return (
    <>
      <TitleRow titleText={"Продукты"} showCallback={onShowProduct} />
      <ProductsFiltersBlock onFiltersChangeCallback={onFiltersChange} status={status} />
      <ProductsHeaderBlock />
      {status === REST_STATUSES.LOADING ? (
        <Preloader />
      ) : (
        <motion.Fragment
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {error && <ErrorBlock textValue={error.message} />}
          {productsList &&
            productsList.length > 0 &&
            productsList.map((product) => (
              <ProductRowBlock
                key={product.id}
                product={product}
                showCallback={onShowProduct}
                deleteCallback={deleteProductById}
              />
            ))}
        </motion.Fragment>
      )}
      {productsCount > size ? (
        <PaginationBlock
          page={page}
          size={size}
          count={productsCount}
          callback={setPage}
        />
      ) : null}
      {(productModal.product ||
        productModal.modalMode === MODE_TYPE.CREATE) && (
        <ModalBlock
          open={productModal.showModal}
          content={
            <ProductForm
              product={productModal.product}
              closeCallback={closeModal}
              mode={productModal.modalMode}
            />
          }
        />
      )}
    </>
  );
}

export default ProductsContainer;
