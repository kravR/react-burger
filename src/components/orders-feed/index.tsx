import { FC } from "react";

import Order from "../../components/order"
import { orders } from "../../utils/constants";

import styles from "./styles.module.css";

const OrdersFeed: FC = () => {
  return (
    <div className={`${styles["orders-feed"]} scrollbar`}>
      {orders.map((order) => <Order order={order} key={order.number} />)}
    </div>
  );
};

export default OrdersFeed;
