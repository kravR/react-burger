import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} pt-4 pb-4`}>
        <nav className={styles.header__nav}>
          <a className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5 mr-2`} href="/">
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </a>
          <a className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5`} href="/">
            <ListIcon type="secondary" />
            <span className="text text_type_main-default ml-2 text_color_inactive">
              Лента заказов
            </span>
          </a>
        </nav>

        <a href="/" className={styles.header__logo}>
          <Logo />
        </a>

        <div className={styles.header__user}>
          <a className={`${styles.header__link} pt-4 pr-5 pb-4 pl-5`} href="/">
            <ProfileIcon type="secondary"/>
            <span className="text text_type_main-default ml-2 text_color_inactive">
              Личный кабинет
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
