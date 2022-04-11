import { FC } from "react";

import Order from "../../components/order"
import { IProps } from "./types"

import styles from "./styles.module.css";

const OrdersFeed: FC<IProps> = ( { orders, isUserOrders = false } ) => {
  return (
    <div className={`${styles["orders-feed"]} scrollbar`}>
      {orders.map((order) => <Order order={order} key={order.number} isUserOrders={isUserOrders} />)}
    </div>
  );
};

export default OrdersFeed;
