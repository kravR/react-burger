import { Link, NavLink, useRouteMatch } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./header.module.css";

export const Header = () => {
  const isConstructor = !!useRouteMatch({ path: "/", exact: true });
  const isFeed = !!useRouteMatch("/feed");
  const isProfile = !!useRouteMatch("/profile");

  return (
    <header className={styles.header}>
      <div className={`${styles.container} pt-4 pb-4`}>
        <nav className={styles.nav}>
          <NavLink
            exact
            to="/"
            activeClassName={styles.link_active}
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5 mr-2`}
          >
            <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            <span className="text text_type_main-default ml-2">
              Конструктор
            </span>
          </NavLink>
          <NavLink
            exact
            to="/feed"
            activeClassName={styles.link_active}
            className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}
          >
            <ListIcon type={isFeed ? "primary" : "secondary"} />
            <span className="text text_type_main-default ml-2">
              Лента заказов
            </span>
          </NavLink>

          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>

          <NavLink
            to="/profile"
            activeClassName={styles.link_active}
            className={`${styles.profile} ${styles.link} pt-4 pr-5 pb-4 pl-5`}
          >
            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
            <span className="text text_type_main-default ml-2">
              Личный кабинет
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
