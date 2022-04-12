import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";
import { WSS_API_ORDERS } from "../../utils/constants";
import FeedDetails from "../../components/feed-details";
import { SELECT_ORDER} from "../../services/actions/order";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./styles.module.css";

export const OrderPage: FC = () => {
  const dispatch = useDispatch();
  const { wsConnected, wsError, orders } = useSelector(
    (store: any) => store.ordersFeed
  );
  const { orderId } = useParams();

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

  useEffect(() => {
    dispatch({
      type: SELECT_ORDER,
      order: orders.find((order) => order._id === orderId),
    });
  }, [dispatch, orders, orderId]);

  return (
    <div className={styles.order}>
      {!wsError && wsConnected && orders.length === 0 && (
        <h3 className="text text_type_main-default mt-10 mb-5">...загрузка</h3>
      )}
      {!wsError && wsConnected && orders && orders.length > 0 && (
        <FeedDetails />
      )}
      {wsError && (
        <h3 className="text text_type_main-default mt-10 mb-5">
          Произошла ошибка. Проверьте интернет-подключение.
        </h3>
      )}
    </div>
  );
};
