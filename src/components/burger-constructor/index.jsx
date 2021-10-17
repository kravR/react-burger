import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal";
import OrderDetails from "../order-details";
import DraggableElement from "../draggable-element";

import {
  ADD_BUN,
  ADD_INGREDIENT,
  RESET_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";

import {
  INCREASE_INGREDIENT_COUNT,
  CLEAR_BUN_COUNT,
  CLEAR_INGREDIENTS_COUNT,
} from "../../services/actions/burger-ingredients";

import {
  getOrder,
  OPEN_ORDER_MODAL,
  RESET_ORDER,
  SET_ORDER_ITEMS,
} from "../../services/actions/order";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, filling } = useSelector((store) => store.burger);
  const { visibleModal, number, ingredients } = useSelector(
    (store) => store.order
  );

  let cost = filling.reduce((acc, item) => acc + item.price, 0);
  if (bun) cost += 2 * bun.price;

  const handleCreateOrder = () => {
    dispatch(getOrder({ ingredients }));
    dispatch({ type: OPEN_ORDER_MODAL });
    dispatch({ type: RESET_CONSTRUCTOR });
    dispatch({ type: CLEAR_INGREDIENTS_COUNT });
  };

  const closeModal = () => {
    dispatch({ type: RESET_CONSTRUCTOR });
    dispatch({ type: RESET_ORDER });
  };

  const handleDrop = (element) => {
    if (element.type === "bun") {
      dispatch({ type: CLEAR_BUN_COUNT });
      dispatch({
        type: ADD_BUN,
        bun: element,
      });
      dispatch({
        type: INCREASE_INGREDIENT_COUNT,
        id: element._id,
        qty: 2,
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        item: element,
      });
      dispatch({
        type: INCREASE_INGREDIENT_COUNT,
        id: element._id,
        qty: 1,
      });
    }
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      handleDrop(item);
    },
  });

  const borderColor = isHover ? "#2f2f37" : "transparent";

  useEffect(() => {
    const order = filling.map((item) => item._id);
    bun && order.push(bun._id);

    dispatch({ type: SET_ORDER_ITEMS, order });
  }, [dispatch, filling, bun]);

  return (
    <div className={`${styles.constructor} pl-4`}>
      <div
        className={`${styles.constructor__items} mb-10`}
        style={{ border: `1px dashed ${borderColor}`, borderRadius: "50px" }}
        ref={dropTarget}
      >
        {bun || filling.length > 0 ? (
          <>
            {bun ? (
              <div className={`${styles.constructor__item} ml-8 mb-4`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  price={bun.price}
                  text={`${bun.name} (верх)`}
                  thumbnail={bun.image_mobile}
                  draggable={false}
                />
              </div>
            ) : (
              /*TODO: стилизовать превью*/
              <div
                className="ml-2 mb-4 pt-2 pb-2 text"
                style={{ textAlign: "center" }}
              >
                Добавить булочку
              </div>
            )}

            <div
              className={`${styles["constructor__items-inner"]} pr-2 scrollbar`}
            >
              {filling.length > 0 ? (
                filling?.map((item, index) => (
                  <DraggableElement
                    item={item}
                    index={index}
                    key={index}
                    draggable={true}
                  />
                ))
              ) : (
                /*TODO: стилизовать превью*/
                <div
                  className="ml-2 mb-4 pt-2 pb-2 text"
                  style={{ textAlign: "center" }}
                >
                  Добавить ингредиенты
                </div>
              )}
            </div>

            {bun ? (
              <div className={`${styles.constructor__item} ml-8`} key={bun._id}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  price={bun.price}
                  text={`${bun.name} (низ)`}
                  thumbnail={bun.image_mobile}
                  draggable={false}
                />
              </div>
            ) : (
              /*TODO: стилизовать превью*/
              <div
                className="ml-2 mb-4 pt-2 pb-2 text"
                style={{ textAlign: "center" }}
              >
                Добавить булочку
              </div>
            )}
          </>
        ) : (
          /*TODO: стилизовать превью*/
          <div
            className="ml-2 mb-4 pt-2 pb-2 text"
            style={{ textAlign: "center" }}
          >
            Перетащи сюда игредиенты и собери бургер
          </div>
        )}
      </div>

      {(bun || filling.length > 0) && (
        <div className={`${styles.constructor__bottom} pr-4`}>
          <div className={`${styles.constructor__cost} mr-10`}>
            <span className="text text_type_digits-medium mr-2">{cost}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            {...(bun && { onClick: handleCreateOrder })}
          >
            Оформить заказ
          </Button>
        </div>
      )}

      {visibleModal && (
        <Modal onClose={closeModal}>
          <OrderDetails order={`${number}`} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructor;
