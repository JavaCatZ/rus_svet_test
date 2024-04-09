/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  getAccessTokenFromCache,
  getUserProfileFromCache,
  saveAccessTokenToCache,
  saveUserProfileToCache,
} from "Utils/CacheUtils";
import Title from "Components/base/Title";
import Input from "Components/base/Input";
import PassInput from "Components/base/PassInput";
import { COLORS } from "Constants/Colors";
import { signIn, REST_STATUSES } from "Api/Api";
import SendBtn from "Components/base/buttons/SendBtn";
import { ROUTE_LINKS } from "Api/Links";
import { showErrorMessage } from "Utils/MessageUtils";
import Logo from "Assets/images/Logo";
import { PASSWORD_REGEX_RULES } from "Utils/BaseUtils";
import * as Yup from "yup";
import { Formik, Form } from "formik";

const LoginFormBlock = styled(motion.div)`
  background: ${COLORS.WHITE};
  width: 524px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 44px 44px 98px 44px;
  border-radius: 24px;

  @media screen and (max-height: 450px) {
    padding: 12px 44px 24px 44px;
  }
`;

const CustomTitle = styled(Title)`
  color: ${COLORS.BLUE};
  margin-bottom: 54px;

  @media screen and (max-height: 550px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const LogoBlock = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: inherit;
  margin-bottom: 24px;

  @media screen and not (max-width: 670px) {
    display: none;
  }
`;

const LogoImg = styled.img`
  width: 68px;
  height: 68px;
`;

const SignInSchema = Yup.object().shape({
  username: Yup.string()
    .max(32, "Слишком длинное имя пользователя")
    .email("Неверный логин пользователя")
    .required("Введите логин"),
  password: Yup.string()
    .matches(PASSWORD_REGEX_RULES, { message: "Неверный пароль пользователя" })
    .required("Введите пароль"),
});

function LoginForm() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(getAccessTokenFromCache());
  const [status, setStatus] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!authError && accessToken && accessToken !== "") {
      saveAccessTokenToCache(accessToken);
      setStatus(REST_STATUSES.RESOLVED);
      navigate(ROUTE_LINKS.CATEGORIES_PATH);
    }
  }, [accessToken]);

  useEffect(() => {
    if (authError) {
      showErrorMessage(`${authError.message}`);
    }
  }, [authError]);

  function authorization(values) {
    signIn({
      name: values.username,
      pass: values.password,
    })
      .then((data) => {
        setAuthError(null);
        setAccessToken(data.jwt_token);
        saveUserProfileToCache({
          user_name: data.user_name,
          roles: data.roles,
        });
      })
      .catch((err) => {
        setAuthError(err);
        setStatus(REST_STATUSES.REJECTED);
      });
  }

  const onSend = (values) => {
    authorization(values);
    setStatus(REST_STATUSES.LOADING);
  };

  return (
    <LoginFormBlock
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LogoBlock>
        <LogoImg src={Logo} />
      </LogoBlock>
      <CustomTitle textValue="Авторизация" />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: getUserProfileFromCache()
            ? getUserProfileFromCache().user_name
            : "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          onSend(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              placeholder="Логин"
              name="username"
              type="email"
              hasError={errors.username && touched.username}
              errorText={errors.username}
            />
            <PassInput
              placeholder="Пароль"
              name="password"
              hasError={errors.password && touched.password}
              errorText={errors.password}
            />
            <SendBtn text="Войти" status={status} />
          </Form>
        )}
      </Formik>
    </LoginFormBlock>
  );
}

export default LoginForm;
