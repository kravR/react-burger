import { Link } from "react-router-dom";

import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Container } from "../../components/container";
import { Form } from "../../components/form";

import styles from "./register.module.css";

export const RegisterPage = () => {
  return (
    <Container>
      <div className={styles.page}>
        <h3 className="text text_type_main-medium mb-6">Регистрация</h3>
        <Form>
          <Input
            placeholder="Имя"
            name="name"
          />
          <Input
            type="email"
            placeholder="E-mail"
            name="email"
          />
          <PasswordInput
            name="password"
          />
          <Button type="primary" size="medium">
            Регистрация
          </Button>
        </Form>

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
    </Container>
  );
};
