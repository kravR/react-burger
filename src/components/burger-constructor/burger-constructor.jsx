import { useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { cardObj } from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = ({ data }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const handleOrderDetails = () => {
    setVisibleModal(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
  };

  return (
    <div className={`${styles.constructor} pl-4`}>
      <div className={`${styles.constructor__items} mb-10`}>
        {data.slice(0, 1).map((item) => (
          <div
            className={`${styles.constructor__item} ml-8 mb-4`}
            key={item._id}
          >
            <ConstructorElement
              type="top"
              isLocked={true}
              price={item.price}
              text={`${item.name} (верх)`}
              thumbnail={item.image_mobile}
            />
          </div>
        ))}

        <div className={`${styles["constructor__items-inner"]} pr-2 scrollbar`}>
          {data.slice(1, data.length - 1).map((item) => (
            <div className={`${styles.constructor__item} ml-2 mb-4`} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                price={item.price}
                text={item.name}
                thumbnail={item.image_mobile}
              />
            </div>
          ))}
        </div>

        {data.slice(0, 1).map((item) => (
          <div className={`${styles.constructor__item} ml-8`} key={item._id}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              price={item.price}
              text={`${item.name} (низ)`}
              thumbnail={item.image_mobile}
            />
          </div>
        ))}
      </div>
      <div className={`${styles.constructor__bottom} pr-4`}>
        <div className={`${styles.constructor__cost} mr-10`}>
          <span className="text text_type_digits-medium mr-2">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleOrderDetails}>
          Оформить заказ
        </Button>
      </div>
      {visibleModal && (
        <Modal onClose={closeModal}>
          <OrderDetails order={"034536"}/>
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(cardObj).isRequired,
};

export default BurgerConstructor;
