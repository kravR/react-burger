import { FC, useEffect, useMemo } from "react";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../../services/actions/wsActions";
import { WSS_API_USER_ORDERS } from "../../../utils/constants";
import OrdersFeed from "../../../components/orders-feed";

import { useDispatch, useSelector } from "../../../services/hooks";

import styles from "./styles.module.css";

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { wsError, wsConnected, orders } = useSelector((store) => store.ordersFeed);
  const ordersData = useMemo(() => orders, [orders]);

  useEffect(() => {
    const accessToken = localStorage
      .getItem("accessToken")
      ?.replace("Bearer ", "");
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${WSS_API_USER_ORDERS}/?token=${accessToken}`,
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED,
      });
    };
  }, [dispatch]);

  console.log("profile fead");
  console.log(orders);

  return (
    <>
      <h3 className="text text_type_main-medium mb-6">История заказов</h3>
      <div className={styles.history}>

      {!wsError && wsConnected && orders.length === 0 && (
        <h3 className="text text_type_main-default mt-10 mb-5">...загрузка</h3>
      )}
      {!wsError && wsConnected && orders && orders.length > 0 && (
        <OrdersFeed orders={ordersData} />
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
