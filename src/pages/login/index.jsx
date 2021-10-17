import { Link } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Container } from "../../components/container";
import { Form } from "../../components/form";

import styles from "./login.module.css";

export const LoginPage = () => {
  return (
    <Container>
      <div className={styles.page}>
        <h3 className="text text_type_main-medium mb-6">Вход</h3>
        <Form>
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
          />
          <PasswordInput
            name="password"
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
    </Container>
  );
};
