import { IOrderData } from "../../services/types/data";

export interface IProps {
  total: number;
  totalToday: number;
  ordersReady: Array<IOrderData>;
  ordersInProgress: Array<IOrderData>;
}
