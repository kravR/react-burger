import { Link } from "react-router-dom";

import { Container } from "../../components/container";

import styles from "./page-404.module.css";

export const Page404 = () => {
  return (
    <Container>
      <div className={styles.page}>
        <h3 className="text text_type_main-medium mb-6">404</h3>
        <h3 className="text text_type_main-medium mb-6">Страница не найдена</h3>

        <div className={styles.links}>
          <Link to="/" className={`${styles.link} text text_type_main-default`}>
            Вернуться на главную страницу
          </Link>
        </div>
      </div>
    </Container>
  );
};
