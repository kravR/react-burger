import { Link } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Container } from "../../components/container";
import { Form } from "../../components/form";

import styles from "./profile.module.css";

export const Profile = () => {
  return (
    <Container>
      <div className={styles.page}>
        <div className={styles.menu}>
          <Link
            to="/profile"
            className={`${styles.link} ${styles.active} text text_type_main-medium active`}
          >
            Профиль
          </Link>
          <div className={`${styles.link} text text_type_main-medium text_color_inactive`}>
            История заказов
          </div>
          <div
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </div>
          <div className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </div>
        </div>
        <div className={styles.content}>
          <Form>
            <Input type="text" name="name" placeholder="Имя" icon="EditIcon" />
            <Input
              type="email"
              name="email"
              placeholder="Логин"
              icon="EditIcon"
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              icon="EditIcon"
            />
            <div className={styles.form_btns}>
              <Button type="secondary" size="medium">
                Отмена
              </Button>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};
