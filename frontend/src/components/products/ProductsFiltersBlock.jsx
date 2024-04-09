/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Row } from "react-materialize";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";
import RsSelect from "Components/base/RsSelect";
import Input from "Components/base/Input";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import SendBtn from "Components/base/buttons/SendBtn";
import ResetBtn from "Components/base/buttons/ResetBtn";
import { getBearerAuthFields } from "Utils/RestFieldsUtils";
import { getAllCategories } from "Api/Api";
import { getAccessTokenFromCache } from "Utils/CacheUtils";
import Search from "Assets/icons/Search";
import Close from "Assets/icons/Close";

const FiltersContainerRow = styled(Row)`
  display: flex;
  align-items: left;
  height: auto;
  width: 100%;
  padding: 12px;
  margin-bottom: 24px;
  border: 1px solid ${COLORS.BLUE};
  border-radius: 16px;
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${COLORS.BLUE};
  text-overflow: ellipsis;

  @media screen and (max-width: 1500px), (max-height: 780px) {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 6px;
  }

  @media screen and (max-width: 1300px), (max-height: 690px) {
    font-size: 12px;
    line-height: 18px;
    padding: 8px 6px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 940px), (max-height: 600px) {
    font-size: 10px;
    line-height: 16px;
    padding: 8px 4px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 800px), (max-height: 540px) {
    font-size: 10px;
    line-height: 16px;
    padding: 8px 2px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 670px) {
    display: none;
  }
`;

const FilterInput = styled(Input)`
  width: 200px;
  margin-left: 24px;
`;

const FilterSendBtn = styled(SendBtn)`
  width: 80px;
  margin-left: 24px;
`;

const FilterResetBtn = styled(ResetBtn)`
  width: 80px;
  margin-left: 24px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;

  @media screen and (max-width: 1000px) {
    width: 25px;
    height: 25px;
  }
`;

const ProductsFiltersSchema = Yup.object().shape({
  name: Yup.string().max(32, "Слишком длинное наименование"),
  min_price: Yup.number()
    .min(0, "Мин. цена не может быть меньше 0")
    .typeError("Мин. цена должна быть числом")
    .default(0),
  max_price: Yup.number()
    .min(0, "Максимальная цена не может быть меньше 0")
    .typeError("Макс. цена должна быть числом")
    .notRequired(),
});

function ProductsFiltersBlock({ onFiltersChangeCallback, status }) {
  const accessToken = getAccessTokenFromCache();
  const [allCategoriesList, setAllCategoriesList] = useState([]);

  useEffect(() => {
    getAllCategories(getBearerAuthFields(accessToken))
      .then((data) => {
        setAllCategoriesList(data);
      })
      .catch((err) => {
        showErrorMessage(`Ошибка загрузки категорий: ${err.message}`);
      });
  }, []);

  return (
    <Formik
      initialValues={{
        category_id: "",
        name: "",
        min_price: 0,
        max_price: "",
      }}
      enableReinitialize
      validationSchema={ProductsFiltersSchema}
      onSubmit={(values) => {
        var filters = values.category_id
          ? `&categoryId=${values.category_id}`
          : "";
        filters = filters + (values.name !== "" ? `&name=${values.name}` : "");
        filters =
          filters +
          (values.min_price !== 0
            ? `&minPrice=${values.min_price}`
            : "&minPrice=0");
        filters =
          filters +
          (values.max_price !== "" ? `&maxPrice=${values.max_price}` : "");
        onFiltersChangeCallback(filters);
      }}
      onReset={() => {
        onFiltersChangeCallback("&minPrice=0");
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <FiltersContainerRow>
            <RsSelect
              onChange={(e) => setFieldValue("category_id", e.target.value)}
              id="product_filter_id_1"
              name="category_id"
              children={allCategoriesList?.map((ctg, idx) => {
                return (
                  <option
                    key={idx}
                    selected={false}
                    value={ctg.id}
                    children={ctg.name}
                  />
                );
              })}
            />
            <FilterInput
              placeholder="Наименование"
              name="name"
              type="text"
              hasError={errors.name && touched.name}
              errorText={errors.name}
            />
            <FilterInput
              placeholder="Мин. цена"
              name="min_price"
              type="text"
              hasError={errors.min_price && touched.min_price}
              errorText={errors.min_price}
            />
            <FilterInput
              placeholder="Макс. цена"
              name="max_price"
              type="text"
              hasError={errors.max_price && touched.max_price}
              errorText={errors.max_price}
            />
            <FilterSendBtn text={<Icon src={Search} />} status={status} />
            <FilterResetBtn type="reset" text={<Icon src={Close} />} />
          </FiltersContainerRow>
        </Form>
      )}
    </Formik>
  );
}

export default ProductsFiltersBlock;
