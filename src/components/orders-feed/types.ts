import { IOrderData } from "../../services/types/data";

export interface IProps {
  orders: Array<IOrderData>;
  isUserOrder?: boolean;
}
