/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { COLORS } from "Constants/Colors";
import Logo from "Assets/images/Logo";
import Close from "Assets/icons/Close";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
  REST_STATUSES,
  getAllCategories,
  createProduct,
  changeProduct,
} from "Api/Api";
import {
  getBearerAuthFields,
  getFieldsWithProductFormAndHeaders,
} from "Utils/RestFieldsUtils";
import { MODE_TYPE } from "Constants/Base";
import SendBtn from "Components/base/buttons/SendBtn";
import { showSuccessMessage, showErrorMessage } from "Utils/MessageUtils";
import { getAccessTokenFromCache } from "Utils/CacheUtils";
import PhotoLoader from "Components/base/blocks/PhotoLoader";
import Input from "Components/base/Input";
import RsSelect from "Components/base/RsSelect";
import { Switch } from "react-materialize";

const gradient = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

const FormBlock = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormBodyBlock = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FormLeftBlock = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 25px 10px 25px 20px;
`;

const FormRightBlock = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 20px 25px 10px;
`;

const FormTitleBlock = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  border-radius: 12px 12px 0 0;
  animation: ${gradient} 5s ease infinite;
  background: rgb(163, 223, 218);
  background-attachment: fixed;
  background-image: linear-gradient(
    180deg,
    rgba(64, 117, 236, 1) 0%,
    rgba(35, 101, 218, 1) 40%,
    rgba(18, 65, 147, 1) 100%
  );
  background-size: 400% 400%;
  background-attachment: fixed;
`;

const FormTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: ${COLORS.WHITE};
`;

const CloseIconBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 70px;
  transition: 0.2s linear;
  padding-right: 12px;

  &:hover {
    filter: brightness(1.1) !important;
    cursor: pointer;
  }
`;

const CloseIconBtn = styled.img`
  width: 20px;
  height: 20px;
`;

const FormTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  width: 100%;
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: ${COLORS.BLACK};
`;

const FormStatusBlock = styled(FormTextBlock)`
  flex-direction: row;
`;

const FormTextTitle = styled.div`
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: ${COLORS.BLUE};
  margin-bottom: 12px;
`;

const FormTextDelimiter = styled.hr`
  width: 100%;
  align: center;
  border: 1px solid;
  color: ${COLORS.BLUE};
  background-color: ${COLORS.BLUE};
  opacity: 0.5;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const LogoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  margin-top: 24px;
`;

const LogoImg = styled.img`
  width: 35px;
  height: 35px;
`;

const CustomSwitch = styled(Switch)`
  &::before {
    background-color: ${COLORS.BLACK};
  }
`;

const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, "Слишком длинное наименование")
    .required("Введите наименование"),
  desc: Yup.string()
    .max(512, "Слишком длинное описание")
    .required("Введите описание"),
  price: Yup.number()
    .typeError("Цена должна быть числом")
    .min(0, "Цена не может быть меньше нуля")
    .max(1000000, "Слишком большая цена")
    .required("Укажите цену"),
  category_id: Yup.number().required("Укажите категорию"),
  status: Yup.bool().required("Укажите статус"),
});

function ProductForm({ product, closeCallback, mode }) {
  const accessToken = getAccessTokenFromCache();
  const [status, setStatus] = useState(null);
  const [fileLoadError, setFileLoadError] = useState(false);
  const [allCategoriesList, setAllCategoriesList] = useState([]);

  useEffect(() => {
    getAllCategories(getBearerAuthFields(accessToken))
      .then((data) => {
        setAllCategoriesList(data);
        setStatus(REST_STATUSES.RESOLVED);
      })
      .catch((err) => {
        showErrorMessage(`Ошибка загрузки категорий: ${err.message}`);
        setStatus(REST_STATUSES.REJECTED);
      });
    setStatus(REST_STATUSES.LOADING);
  }, []);

  const onSend = (values) => {
    if (mode === MODE_TYPE.CREATE && !values.image_file) {
      showErrorMessage("Загрузите файл продукта");
      setFileLoadError(true);
      return;
    }

    const dto = {
      name: values.name,
      desc: values.desc,
      price: values.price,
      category_id: values.category_id,
      status: values.status,
    };

    const req = {
      accessToken,
      dto:
        mode === MODE_TYPE.UPDATE
          ? Object.assign(dto, { id: product.id })
          : dto,
      imageFile: values.image_file,
    };

    const reqFields = getFieldsWithProductFormAndHeaders(req);

    switch (mode) {
      case MODE_TYPE.CREATE:
        createProduct(reqFields.get("headers"), reqFields.get("body"))
          .then(() => {
            showSuccessMessage(`Продукт: ${values.name} успешно создан`);
            setStatus(REST_STATUSES.RESOLVED);
            closeCallback({
              product: null,
              showModal: false,
              modalMode: null,
            });
          })
          .catch((err) => {
            showErrorMessage(`Ошибка создания продукта: ${err.message}`);
            setStatus(REST_STATUSES.REJECTED);
          });
        break;

      case MODE_TYPE.UPDATE:
        changeProduct(reqFields.get("headers"), reqFields.get("body"))
          .then(() => {
            showSuccessMessage(`Продукт: ${values.name} успешно изменен`);
            setStatus(REST_STATUSES.RESOLVED);
            closeCallback({
              product: null,
              showModal: false,
              modalMode: null,
            });
          })
          .catch((err) => {
            showErrorMessage(`Ошибка изменения продукта: ${err.message}`);
            setStatus(REST_STATUSES.REJECTED);
          });
        break;

      default:
        return;
    }

    setStatus(REST_STATUSES.LOADING);
  };

  return (
    <FormBlock>
      <motion.Fragment
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FormTitleBlock>
          {product ? (
            <FormTitle>{`Продукт № ${product.id}`}</FormTitle>
          ) : (
            <FormTitle>{`Создание продукта`}</FormTitle>
          )}
          <CloseIconBlock
            onClick={() =>
              closeCallback({
                product: null,
                showModal: false,
                modalMode: null,
              })
            }
          >
            <CloseIconBtn src={Close} />
          </CloseIconBlock>
        </FormTitleBlock>
        <Formik
          initialValues={{
            name: product?.name || "",
            desc: product?.desc || "",
            price: product?.price || "",
            category_id: `${product?.category_dto?.id}` || "",
            status: product?.status || "",
            image_file: null,
          }}
          validationSchema={ProductSchema}
          onSubmit={(values) => {
            onSend(values);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <FormBodyBlock>
                <FormLeftBlock>
                  <PhotoLoader
                    name="image_file"
                    photoUrl={product?.image_src || null}
                    hasError={fileLoadError}
                    photoLoadCallback={(photoFile) => {
                      setFieldValue("image_file", photoFile);
                      setFileLoadError(false);
                    }}
                  />
                </FormLeftBlock>
                <FormRightBlock>
                  <FormTextBlock>
                    <FormTextTitle>Наименование:</FormTextTitle>
                    <Input
                      placeholder="Наименование"
                      name="name"
                      type="text"
                      hasError={errors.name && touched.name}
                      errorText={errors.name}
                      disabled={mode === MODE_TYPE.SHOW}
                    />
                  </FormTextBlock>
                  <FormTextBlock>
                    <FormTextTitle>Описание:</FormTextTitle>
                    <Input
                      placeholder="Описание"
                      name="desc"
                      type="text"
                      hasError={errors.desc && touched.desc}
                      errorText={errors.desc}
                      disabled={mode === MODE_TYPE.SHOW}
                    />
                  </FormTextBlock>
                  <FormTextBlock>
                    <FormTextTitle>Цена:</FormTextTitle>
                    <Input
                      placeholder="Цена"
                      name="price"
                      type="text"
                      hasError={errors.price && touched.price}
                      errorText={errors.price}
                      disabled={mode === MODE_TYPE.SHOW}
                    />
                  </FormTextBlock>
                  <FormTextBlock>
                    <FormTextTitle>Категория:</FormTextTitle>
                    <RsSelect
                      onChange={(e) =>
                        setFieldValue("category_id", e.target.value)
                      }
                      id="product_modal_id_1"
                      name="category_id"
                      children={allCategoriesList?.map((ctg, idx) => {
                        console.log(values.category_id);
                        return (
                          <option
                            selected={
                              mode === MODE_TYPE.UPDATE &&
                              ctg.id === Number.parseInt(values.category_id)
                            }
                            key={idx}
                            value={ctg.id}
                            children={ctg.name}
                          />
                        );
                      })}
                    />
                  </FormTextBlock>
                  <FormStatusBlock>
                    <FormTextTitle>Статус:</FormTextTitle>
                    <CustomSwitch
                      name={"status"}
                      onChange={(e) => {
                        console.log(e.target);
                        setFieldValue("status", e.target.checked);
                      }}
                      checked={values.status}
                    />
                  </FormStatusBlock>

                  {mode !== MODE_TYPE.SHOW && (
                    <>
                      <FormTextDelimiter />
                      <SendBtn text="Сохранить" status={status} />
                    </>
                  )}
                  <FormTextDelimiter />
                  <LogoBlock>
                    <LogoImg src={Logo} />
                  </LogoBlock>
                </FormRightBlock>
              </FormBodyBlock>
            </Form>
          )}
        </Formik>
      </motion.Fragment>
    </FormBlock>
  );
}

export default ProductForm;
