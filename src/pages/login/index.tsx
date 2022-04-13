import { ChangeEvent, FormEvent, FC, useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";
import { login } from "../../services/actions/auth";
import { ILoginParams } from "../../services/types/data";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./styles.module.css";

export const LoginPage: FC = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { isAuthorized, isError, error } = useSelector((store) => store.auth);

  const [values, setFormValues] = useState<ILoginParams>({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(login(values));
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
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </Form>

      {isError && (
        <p className={`${styles.error} text text_type_main-default mt-6`}>
          {error?.message}
        </p>
      )}

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
