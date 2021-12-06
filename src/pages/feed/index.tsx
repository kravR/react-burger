import { FC } from "react";

import OrdersFeed from "../../components/orders-feed";
import OrdersSummary from "../../components/orders-summary";

import styles from "./styles.module.css";

export const FeedPage: FC = () => {
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.feed}>
        <OrdersFeed />
        <OrdersSummary />
      </div>
    </>
  );
};
