import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";

import { login } from "../../services/actions/auth";

import styles from "./login.module.css";

export const LoginPage = () => {
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((store) => store.auth);

  const [values, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(values));
    history.replace({
      pathname: state?.from.pathname || "/",
    });
  };

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={styles.page}>
      <h3 className="text text_type_main-medium mb-6">Вход</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          required
          value={values.password}
          onChange={handleChange}
        />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </Form>

      <div className={`${styles.links} mt-20 mb-4`}>
        <p className="text text_type_main-default text_color_inactive mr-1">
          Вы — новый пользователь?
        </p>
        <Link
          to="/register"
          className={`${styles.link} text text_type_main-default`}
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive mr-1">
          Забыли пароль?
        </p>
        <Link
          to="/forgot-password"
          className={`${styles.link} text text_type_main-default`}
        >
          Восстановить пароль
        </Link>
      </div>
    </div>
  );
};
