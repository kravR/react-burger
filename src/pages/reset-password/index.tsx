import { ChangeEvent, FormEvent, FC, useEffect, useRef, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Form } from "../../components/form";

import { resetPassword } from "../../services/actions/auth";
import { IResetPasswordParams } from "../../services/types/data";
import { useDispatch, useSelector } from '../../services/hooks';
import styles from "./reset-password.module.css";

export const ResetPassword: FC = () => {
  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthorized, isReset } = useSelector((store: any) => store.auth);
  const [type, setType] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const onPassIconClick = (inputRef) => {
    setType(!type);
    inputRef.current.focus();
  };

  const [values, setFormValues] = useState<IResetPasswordParams>({
    password: "",
    token: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(resetPassword(values));
    history.replace({
      pathname: "/login",
    });
  };

  useEffect(() => {
    // Moving cursor to the end
    if (passwordRef && passwordRef.current) {
      passwordRef.current.selectionStart = passwordRef.current.value.length;
      passwordRef.current.selectionEnd = passwordRef.current.value.length;
    }
  }, [type]);

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  if (!isReset) {
    return <Redirect to={state?.from || "/forgot-password"} />;
  }

  return (
    <div className={styles.page}>
      <h3 className="text text_type_main-medium mb-6">Восстановление пароля</h3>
      <Form onSubmit={handleSubmit}>
        <Input
          type={type ? "text" : "password"}
          name="password"
          placeholder="Введите новый пароль"
          icon={type ? "HideIcon" : "ShowIcon"}
          ref={passwordRef}
          value={values.password}
          onChange={handleChange}
          onIconClick={() => onPassIconClick(passwordRef)}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          name="token"
          value={values.token}
          onChange={handleChange}
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
          to="/login"
          className={`${styles.link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </div>
  );
};
