import { FC, useEffect, useMemo } from "react";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";
import { WSS_API_ORDERS } from "../../utils/constants";
import { ORDER_STATUSES } from "../../services/types/data";
import OrdersFeed from "../../components/orders-feed";
import OrdersSummary from "../../components/orders-summary";

import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./styles.module.css";

export const FeedPage: FC = () => {
  const dispatch = useDispatch();

  const { orders, total, totalToday } = useSelector(
    (store) => store.ordersFeed
  );
  const isConnect = useSelector((store) => store.ordersFeed.wsConnected);

  const ordersData = useMemo(() => orders, [orders]);

  const ordersReady = useMemo(
    () =>
      orders.filter(({ status }) => status === ORDER_STATUSES.DONE).slice(0, 5),
    [orders]
  );
  const ordersInProgress = useMemo(
    () =>
      orders
        .filter(({ status }) => status === ORDER_STATUSES.PENDING)
        .slice(0, 5),
    [orders]
  );

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: WSS_API_ORDERS,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  console.log(ordersReady)
  console.log(ordersInProgress)

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.feed}>
        {isConnect ? (
          <>
            <OrdersFeed orders={ordersData} />
            <OrdersSummary
              ordersReady={ordersReady}
              ordersInProgress={ordersInProgress}
              total={total}
              totalToday={totalToday}
            />
          </>
        ) : (
          <h3 className="text text_type_main-default mt-10 mb-5">
            ...загрузка
          </h3>
        )}
      </div>
    </>
  );
};
