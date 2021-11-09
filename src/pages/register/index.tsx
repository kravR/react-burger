import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";

import { registration } from "../../services/actions/auth";

import styles from "./register.module.css";

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { isAuthorized, isError, error } = useSelector((store: any) => store.auth);

  const [values, setFormValues] = useState({
    name: "",
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
    await dispatch(registration(values));
  };

  if (isAuthorized) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <div className={styles.page}>
      <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Имя"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="E-mail"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button type="primary" size="medium">
          Регистрация
        </Button>
      </Form>

      {isError && (
        <p className={`${styles.error} text text_type_main-default mt-6`}>
          {error.message}
        </p>
      )}

      <div className={`${styles.links} mt-20 mb-4`}>
        <p className="text text_type_main-default text_color_inactive mr-1">
          Уже зарегистрированы?
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
