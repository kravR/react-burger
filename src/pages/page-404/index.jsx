import { Link, useHistory } from "react-router-dom";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./page-404.module.css";

export const Page404 = () => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <div className={styles.page}>
      <h3 className="text text_type_main-medium mb-6">404</h3>
      <h3 className="text text_type_main-medium mb-10">Страница не найдена</h3>
      <Button onClick={handleClick}>Вернуться обратно</Button>
      <div className={`${styles.links} mt-6`}>
        <p className="text text_type_main-default mr-2">или на</p>
        <Link to="/" className={`${styles.link} text text_type_main-default`}>
          главную страницу
        </Link>
      </div>
    </div>
  );
};
