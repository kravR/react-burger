import { FC, useMemo } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { formatTimeAgo } from "../../utils/formatTimeAgo";
import IngredientAvatars from "../../components/ingregient-avatars";
import { useSelector } from "../../services/hooks";
import { SELECT_ORDER } from "../../services/actions/order";
import { useDispatch } from "../../services/hooks";
import { ILocationState, IIngredientData } from "../../services/types/data";

import { IProps } from "./types";
import styles from "./styles.module.css";

const Order: FC<IProps> = ({ order, isUserOrder = false }) => {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredients);

  const uniqueOrderIngredients = Array.from(new Set(order.ingredients)).filter(
    Boolean
  );

  const orderIngredients: Array<IIngredientData | undefined> = useMemo(() => {
    return uniqueOrderIngredients.map((ingredient) => {
      return ingredients.find((item) => item._id === ingredient);
    });
  }, [ingredients, uniqueOrderIngredients]);

  const orderPrice = orderIngredients.reduce((acc, current) => {
    if (current && current.type === "bun") {
      acc += current.price * 2;
    } else if (current) {
      acc += current.price;
    }
    return acc;
  }, 0);

  const handleCardDetail = (id: string) => {
    dispatch({
      type: SELECT_ORDER,
      order: order,
    });
    history.push({
      pathname: `${url}/${id}`,
      state: { background: location },
    });
  };

  return (
    <article
      onClick={() => handleCardDetail(order?._id)}
      className={`${styles.order} mb-6`}
    >
      <div className={`${styles.info} mb-6`}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {formatTimeAgo(order.createdAt)}
        </span>
      </div>
      <h3 className="text text_type_main-medium mb-6">{order.name}</h3>
      {order.status && isUserOrder && (
        <div className={`${styles.status} text text_type_main-default mb-6`}>
          {order.status === "done" && (
            <span className={styles.status_done}>????????????????</span>
          )}

          {order.status === "pending" && <span>??????????????????</span>}

          {order.status === "??reated" && <span>????????????</span>}
        </div>
      )}

      <div className={styles.details}>
        {orderIngredients && orderIngredients.length && (
          <IngredientAvatars items={orderIngredients} max={5} />
        )}
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {orderPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
};

export default Order;
