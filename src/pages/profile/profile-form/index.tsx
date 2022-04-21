import { ChangeEvent, FormEvent, FC, useState, useEffect, useRef } from "react";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../../components/form";
import { updateUser } from "../../../services/actions/auth";
import { IUserUpdateParams } from "../../../services/types/data";
import { useDispatch, useSelector } from "../../../services/hooks";

import styles from "../styles.module.css";

export const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onFocusInput = (inputRef) =>
    inputRef.current.classList.add(`${styles.active}`);
  const onBlurInput = (inputRef) =>
    inputRef.current.classList.remove(`${styles.active}`);
  const onIconClick = (inputRef) => inputRef.current.focus();

  const { isLoading, isError, user, error } = useSelector(
    (store) => store.auth
  );

  const [values, setFormValues] = useState<IUserUpdateParams>({
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      ) : (
        <div className={styles.form}>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Имя"
              icon="EditIcon"
              ref={nameRef}
              value={values.name}
              onChange={handleChange}
              onFocus={() => onFocusInput(nameRef)}
              onBlur={() => onBlurInput(nameRef)}
              onIconClick={() => onIconClick(nameRef)}
            />

            <Input
              type="email"
              name="email"
              placeholder="Логин"
              icon="EditIcon"
              ref={emailRef}
              value={values.email}
              onChange={handleChange}
              onFocus={() => onFocusInput(emailRef)}
              onBlur={() => onBlurInput(emailRef)}
              onIconClick={() => onIconClick(emailRef)}
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              icon="EditIcon"
              ref={passwordRef}
              value={values.password}
              onChange={handleChange}
              onFocus={() => onFocusInput(passwordRef)}
              onBlur={() => onBlurInput(passwordRef)}
              onIconClick={() => onIconClick(passwordRef)}
            />
            {isError && (
              <p className={`${styles.error} text text_type_main-default my-4`}>
                {error?.message}
              </p>
            )}

            {(values.email || values.password || values.name) && (
              <div className={styles.form_btns}>
                <Button type="secondary" size="medium" onClick={handleReset}>
                  Отмена
                </Button>
                <Button type="primary" size="medium">
                  Сохранить
                </Button>
              </div>
            )}
          </Form>
        </div>
      )}
    </>
  );
};
