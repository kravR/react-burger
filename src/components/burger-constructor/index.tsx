import { FC, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDrop } from "react-dnd";

import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import DraggableElement from "../draggable-element";

import { useDispatch, useSelector } from "../../services/hooks";

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
  createOrder,
  RESET_ORDER,
  SET_ORDER_ITEMS,
} from "../../services/actions/order";
import { ILocationState, IIngredientData } from "../../services/types/data";

import styles from "./styles.module.css";

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation<ILocationState>();
  const { isAuthorized } = useSelector((store) => store.auth);
  const { bun, filling } = useSelector((store) => store.burger);
  const { ingredients } = useSelector((store) => store.order);

  let cost = filling.reduce((acc, item) => acc + item.price, 0);
  if (bun) cost += 2 * bun.price;

  const handleCreateOrder = () => {
    if (isAuthorized) {
      dispatch({ type: RESET_ORDER });
      dispatch(createOrder({ ingredients }));
      history.push({
        pathname: "/create-order",
        state: {
          background: location,
        },
      });
      dispatch({ type: RESET_CONSTRUCTOR });
      dispatch({ type: CLEAR_INGREDIENTS_COUNT });
    } else {
      history.push("/login");
    }
  };

  const handleDrop = (element: IIngredientData) => {
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
    drop(item: IIngredientData) {
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
    <div className={`${styles.constructor} pl-4`} id="constructor">
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
                  price={bun?.price}
                  text={`${bun?.name} (верх)`}
                  thumbnail={bun?.image_mobile ? bun?.image_mobile : ""}
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
                  <DraggableElement item={item} index={index} key={index} />
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
              <div
                className={`${styles.constructor__item} ml-8`}
                key={bun?._id}
              >
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  price={bun?.price}
                  text={`${bun?.name} (низ)`}
                  thumbnail={bun?.image_mobile ? bun?.image_mobile : ""}
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
    </div>
  );
};

export default BurgerConstructor;
