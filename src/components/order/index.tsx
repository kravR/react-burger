import { FC } from "react";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientAvatars from "../../components/ingregient-avatars";

import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { data as ingregients } from "../../utils/data";

import { IProps } from "./types";
import styles from "./styles.module.css";

const Order: FC<IProps> = ({ order }) => {

  return (
    <article className={`${styles.order} mb-6`}>
      <div className={`${styles.info} mb-6`}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          {formatTimeAgo(order.createdAt)}
        </span>
      </div>
      <h3 className="text text_type_main-medium mb-6">{order.name}</h3>
      {order.status && (
        <div className={`${styles.status} text text_type_main-default mb-6`}>
          {order.status === "done" && (
            <span className={styles.status_done}>
              Выполнен
            </span>
          )}
          
          {order.status === "pending" && (
            <span>Готовится</span>
          )}
          
          {order.status === "сreated" && (
            <span>Создан</span>
          )}
        </div>
      )}

      <div className={styles.details}>
        {ingregients.length && (
          <IngredientAvatars items={ingregients} max={6} />
        )}
        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">560</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </article>
  );
};

export default Order;
