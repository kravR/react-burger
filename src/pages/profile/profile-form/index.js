import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../../components/form";

import { updateUser } from "../../../services/actions/auth";

import styles from "../profile.module.css";

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, user } = useSelector((store) => store.auth);

  const [values, setFormValues] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });

  const handleReset = () => {
    setFormValues({
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser(values));
  };

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user?.name ?? "",
        email: user?.email ?? "",
        password: "",
      });
    }
  }, [user, setFormValues]);

  return (
    <>
      {isLoading ? (
        <h3 className="text text_type_main-default mt-10 mb-5">...загрузка</h3>
      ) : isError ? (
        <h3 className="text text_type_main-default mt-10 mb-5">
          Произошла ошибка при получении данных
        </h3>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Имя"
            icon="EditIcon"
            required
            value={values.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Логин"
            icon="EditIcon"
            required
            value={values.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Пароль"
            icon="EditIcon"
            required
            value={values.password}
            onChange={handleChange}
          />
          <div className={styles.form_btns}>
            <Button type="secondary" size="medium" onClick={handleReset}>
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};
