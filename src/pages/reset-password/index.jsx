import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";

import { resetPassword } from "../../services/actions/auth";

import styles from "./reset-password.module.css";

export const ResetPassword = () => {
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthorized, isReset } = useSelector((store) => store.auth);

  const [values, setFormValues] = useState({
    password: "",
    token: "",
  });

  const handleChange = (e) => {
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(values));
    history.replace({
      pathname: "/login",
    });
  };

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  if (!isReset) {
    return <Redirect to={state?.from || "/forgot-password"} />;
  }

  return (
    <div className={styles.page}>
      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      <Form onSubmit={handleSubmit}>
        <PasswordInput
          name="password"
          placeholder="Введите новый пароль"
          required
          value={values.password}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          value={values.token}
          onChange={handleChange}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </Form>

      <div className={`${styles.links} mt-20`}>
        <p className="text text_type_main-default text_color_inactive mr-1">
          Вспомнили пароль?
        </p>
        <Link
          to="/login"
          className={`${styles.link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};
