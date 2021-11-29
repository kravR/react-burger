import { ChangeEvent, FormEvent, FC, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";
import { forgotPassword } from "../../services/actions/auth";
import { IForgotPasswordParams } from "../../services/types/data";
import { useDispatch, useSelector } from '../../services/hooks';
import styles from "./forgot-password.module.css";

export const ForgotPassword: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthorized } = useSelector((store: any) => store.auth);

  const [values, setFormValues] = useState<IForgotPasswordParams>({
    email: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(forgotPassword(values));
    history.replace({
      pathname: "/reset-password",
      state: {
        from: location,
      },
    });
  };

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
