import { FC } from "react";

import { IProps } from "./types";
import styles from "./styles.module.css";
import doneIcon from "../../images/done.png";

const OrderDetails: FC<IProps> = ({ order }) => {
  return (
    <div className={styles.order}>
      <p className="text text_type_digits-large mt-4 mb-8">{(Number(order) > 0) ? order : "-"}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img
        className="mb-15"
        src={doneIcon}
        alt="Иконка"
        width="120px"
        height="120px"
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
