import { FC } from "react";

import { orders } from "../../utils/constants";

import styles from "./styles.module.css";

const OrdersSummary: FC = () => {
  const total = 28752;
  const totalToday = 138;

  return (
    <div className={styles.summary}>
      <div className={styles.orders}>
        <div className={styles["orders-in-progress"]}>
          <div className="text text_type_main-medium">Готовы:</div>
          {orders.map(
            (order) =>
              order.status === "done" && (
                <div
                  className="text text_type_digits-default mb-2"
                  key={order._id}
                >
                  {order.number}
                </div>
              )
          )}
        </div>

        {orders.length !== 0 && (
          <div className={styles["orders-in-done"]}>
            <div className="text text_type_main-medium">В работе:</div>
            {orders.map(
              (order) =>
                order.status === "pending" && (
                  <div
                    className="text text_type_digits-default mb-2"
                    key={order.number}
                  >
                    {order.number}
                  </div>
                )
            )}
          </div>
        )}
      </div>

      <div className="text text_type_main-medium">Выполнено за все время:</div>
      <div
        className={`${styles["text-shadow"]} text text_type_digits-large mb-15`}
      >
        {total}
      </div>
      <div className="text text_type_main-medium">Выполнено за сегодня:</div>
      <div className={`${styles["text-shadow"]} text text_type_digits-large`}>
        {totalToday}
      </div>
    </div>
  );
};

export default OrdersSummary;
