import { FC } from "react";

import OrdersFeed from "../../../components/orders-feed";

import styles from "./styles.module.css";

export const ProfileOrders: FC = () => {
  return (
    <>
      <h3 className="text text_type_main-medium mb-6">История заказов</h3>
      <div className={styles.history}>
        <OrdersFeed />
      </div>
    </>
  );
};
