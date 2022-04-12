import { FC } from "react";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "../../services/hooks";
import IngredientAvatars from "../../components/ingregient-avatars";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { ILocationState } from "../../services/types/data";

import { IProps } from "./types";
import styles from "./styles.module.css";

const Order: FC<IProps> = ({ order, isUserOrders = false }) => {
  const { url } = useRouteMatch();
  const location = useLocation<ILocationState>();
  const { ingredients } = useSelector((store: any) => store.ingredients);

  const uniqueOrderIngredients = Array.from(new Set(order.ingredients)).filter(Boolean);

  const orderIngredients = uniqueOrderIngredients.map((ingredient) => {
    return ingredients.find((item) => item._id === ingredient);
  });

  const orderPrice = orderIngredients.reduce((acc, current) => {
    if (current && current.type === 'bun') {
      acc += current.price * 2;
    } else if (current) {
      acc += current.price;
    }
    return acc;
  }, 0)

  return (
    <Link to={{ pathname: `${url}/${order._id}`, state: { background: location } }}
      className={`${styles.order} mb-6`}>
      <div className={`${styles.info} mb-6`}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {formatTimeAgo(order.createdAt)}
        </span>
      </div>
      <h3 className="text text_type_main-medium mb-6">{order.name}</h3>
      {order.status && isUserOrders && (
        <div className={`${styles.status} text text_type_main-default mb-6`}>
          {order.status === "done" && (
            <span className={styles.status_done}>Выполнен</span>
          )}

          {order.status === "pending" && <span>Готовится</span>}

          {order.status === "сreated" && <span>Создан</span>}
        </div>
      )}

      <div className={styles.details}>
        {orderIngredients.length && (
          <IngredientAvatars items={orderIngredients} max={5} />
        )}
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
    
  );
};

export default Order;
