import { useEffect, memo, FC } from "react";
import { NavLink, Route, Switch, useLocation, useHistory, useRouteMatch } from "react-router-dom";

import { ProfileForm } from "./profile-form";
import { ProfileOrders } from "./profile-orders";
import { ILocationState } from "../../services/types/data";
import { getUser, logout } from "../../services/actions/auth";
import { useDispatch } from "../../services/hooks";

import styles from "./styles.module.css";

export const Profile: FC = memo(() => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const dispatch = useDispatch();

  const background = history.action === 'PUSH' && location.state && location.state.background;

  const handleClickLogOut = async () => {
    await dispatch(logout());
    history.replace({ pathname: "/login" });
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.menu}>
        <NavLink
          exact
          to="/profile"
          activeClassName={styles.link_active}
          className={`${styles.link} text text_type_main-medium`}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          to="/profile/orders"
          activeClassName={styles.link_active}
          className={`${styles.link} text text_type_main-medium`}
        >
          История заказов
        </NavLink>
        <div
          className={`${styles.link} text text_type_main-medium`}
          onClick={handleClickLogOut}
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
        <Switch location={background || location}>
          <Route path={`${path}/`} exact>
            <ProfileForm />
          </Route>
          <Route path={`${path}/orders`} exact>
            <ProfileOrders />
          </Route>
        </Switch>
      </div>
    </div>
  );
});
