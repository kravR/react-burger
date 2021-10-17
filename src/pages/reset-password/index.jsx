import { Link } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Container } from "../../components/container";
import { Form } from "../../components/form";

import styles from "./reset-password.module.css";

export const ResetPassword = () => {
  return (
    <Container>
      <div className={styles.page}>
        <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
        <Form>
          <Input
            type="password"
            name="password"
            placeholder="Введите новый пароль"
            icon="ShowIcon"
          />
          <Input
            type="text"
            placeholder="Введите код из письма"
            name="email"
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
