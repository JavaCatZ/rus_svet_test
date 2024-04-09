/* eslint-disable */
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { COLORS } from "Constants/Colors";
import Logo from "Assets/images/Logo";
import Close from "Assets/icons/Close";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { REST_STATUSES, createCategory, changeCategory } from "Api/Api";
import { getBearerAuthFields } from "Utils/RestFieldsUtils";
import { MODE_TYPE } from "Constants/Base";
import SendBtn from "Components/base/buttons/SendBtn";
import { showSuccessMessage, showErrorMessage } from "Utils/MessageUtils";
import { getAccessTokenFromCache } from "Utils/CacheUtils";
import Input from "Components/base/Input";

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
  flex-direction: column;
  justify-content: center;
  padding: 25px 20px;
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

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .max(32, "Слишком длинное наименование")
    .required("Введите наименование"),
  short_desc: Yup.string()
    .max(256, "Слишком длинное описание")
    .required("Введите описание"),
});

function CategoryForm({ category, closeCallback, mode }) {
  const [accessToken, setAccessToken] = useState(getAccessTokenFromCache());
  const [status, setStatus] = useState(null);

  const onSend = (values) => {
    switch (mode) {
      case MODE_TYPE.CREATE:
        createCategory(getBearerAuthFields(accessToken), {
          name: values.name,
          short_desc: values.short_desc,
        })
          .then(() => {
            showSuccessMessage(`Категория: ${values.name} успешно создана`);
            setStatus(REST_STATUSES.RESOLVED);
            closeCallback({
              category: null,
              showModal: false,
              modalMode: null,
            });
          })
          .catch((err) => {
            showErrorMessage(`Ошибка создания категории: ${err.message}`);
            setStatus(REST_STATUSES.REJECTED);
          });
        break;

      case MODE_TYPE.UPDATE:
        changeCategory(getBearerAuthFields(accessToken), {
          id: category.id,
          name: values.name,
          short_desc: values.short_desc,
        })
          .then(() => {
            showSuccessMessage(`Категория: ${values.name} успешно изменена`);
            setStatus(REST_STATUSES.RESOLVED);
            closeCallback({
              category: null,
              showModal: false,
              modalMode: null,
            });
          })
          .catch((err) => {
            showErrorMessage(`Ошибка изменения категории: ${err.message}`);
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
          {
            category ? <FormTitle>{`Категория № ${category.id}`}</FormTitle> : 
            <FormTitle>{`Создание категории`}</FormTitle>
          }
          <CloseIconBlock
            onClick={() =>
              closeCallback({
                category: null,
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
              name: mode !== MODE_TYPE.CREATE ? category.name : "",
              short_desc: mode !== MODE_TYPE.CREATE ? category.short_desc : "",
            }}
            validationSchema={CategorySchema}
            onSubmit={(values) => {
              onSend(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormBodyBlock>
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
                      name="short_desc"
                      type="text"
                      hasError={errors.short_desc && touched.short_desc}
                      errorText={errors.short_desc}
                      disabled={mode === MODE_TYPE.SHOW}
                    />
                  </FormTextBlock>

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
                </FormBodyBlock>
              </Form>
            )}
          </Formik>
       
      </motion.Fragment>
    </FormBlock>
  );
}

export default CategoryForm;
