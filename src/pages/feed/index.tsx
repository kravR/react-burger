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

  const { wsError, wsConnected, orders, total, totalToday } = useSelector(
    (store) => store.ordersFeed
  );

  const ordersData = useMemo(() => orders, [orders]);

  const ordersReady = useMemo(
    () =>
      orders
        .filter(({ status }) => status === ORDER_STATUSES.DONE)
        .slice(0, 10),
    [orders]
  );
  const ordersInProgress = useMemo(
    () =>
      orders
        .filter(({ status }) => status === ORDER_STATUSES.PENDING)
        .slice(0, 10),
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

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.feed}>
        {!wsError && wsConnected && orders.length === 0 && (
          <h3 className="text text_type_main-default mt-10 mb-5">
            ...загрузка
          </h3>
        )}
        {!wsError && wsConnected && orders && orders.length > 0 && (
          <>
            <OrdersFeed orders={ordersData} />
            <OrdersSummary
              ordersReady={ordersReady}
              ordersInProgress={ordersInProgress}
              total={total}
              totalToday={totalToday}
            />
          </>
        )}
        {wsError && (
          <h3 className="text text_type_main-default mt-10 mb-5">
            Произошла ошибка. Проверьте интернет-подключение.
          </h3>
        )}
      </div>
    </>
  );
};
