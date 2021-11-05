import { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";

import { forgotPassword } from "../../services/actions/auth";

import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((store) => store.auth);

  const [values, setFormValues] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(values));
    history.replace({
      pathname: "/reset-password",
      state: {
        from: location,
      },
    });
  };

console.log(location)

  if (isAuthorized) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <div className={styles.page}>
      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Button type="primary" size="medium">
          Восстановить
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
