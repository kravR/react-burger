import { Link } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Container } from "../../components/container";
import { Form } from "../../components/form";

import styles from "./forgot-password.module.css";

export const ForgotPassword = () => {
  return (
    <Container>
      <div className={styles.page}>
        <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
        <Form>
          <Input
            type="text"
            placeholder="Укажите e-mail"
            name="email"
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
            to="/"
            className={`${styles.link} text text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </Container>
  );
};
