import { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientAvatar from "../ingregient-avatar";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useSelector } from "../../services/hooks";
import { IIngredientData } from "../../services/types/data";
import styles from "./styles.module.css";

const FeedDetails: FC = () => {
  const { order = null } = useSelector((store) => store.order);

  const { ingredients } = useSelector((store) => store.ingredients);
  const uniqueOrderIngredients = Array.from(new Set(order?.ingredients)).filter(
    Boolean
  );
  const orderIngredients: Array<IIngredientData | undefined> = useMemo(() => {
    return uniqueOrderIngredients.map((ingredient) => {
      return ingredients.find((item) => item._id === ingredient);
    });
  }, [ingredients, uniqueOrderIngredients]);

  const price = useMemo(() => {
    return orderIngredients.reduce((acc, item) => {
      if (item && item.type === "bun") {
        acc += item && item.price * 2;
      } else if (item) {
        acc += item && item.price;
      }
      return acc;
    }, 0);
  }, [orderIngredients]);

  return (
    <>
      <div className={`${styles.feed}`}>
        <div className={`text text_type_digits-default ${styles.title}`}>
          #{order?.number}
        </div>
        <div className={`text text_type_main-medium  mt-10`}>{order?.name}</div>
        {order?.status && (
          <div
            className={`${styles.status} ${
              order?.status === "done" && styles.status_done
            }  text text_type_main-default`}
          >
            {order?.status === "done" && <>Выполнен</>}
            {order?.status === "pending" && <>Готовится</>}
            {order?.status === "сreated" && <>Создан</>}
          </div>
        )}
        <div className={`text text_type_main-medium mt-15 mb-6`}>Состав:</div>
        <div className={`${styles.ingredients} custom-scroll`}>
          {orderIngredients &&
            orderIngredients.map((item, index) => {
              return (
                <div key={index} className={`${styles.ingredient}`}>
                  <div className={`${styles.ingredient__info}`}>
                    <IngredientAvatar
                      image={item?.image_mobile}
                      alt={item?.name}
                    />
                    <p className="text text_type_main-default ml-4">
                      {item?.name}
                    </p>
                  </div>

                  <div className={`${styles.ingredient__price}`}>
                    <span className={`text text_type_digits-default mr-2`}>
                      {item?.type === "bun" ? 2 : 1} x {item?.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
        </div>
        <div className={`${styles.feed__footer}`}>
          <div
            className={`text text_type_main-default ml-4 text_color_inactive`}
          >
            {order?.createdAt && formatTimeAgo(order?.createdAt)}
          </div>
          <div className={`total__${styles.ingredient__price}`}>
            <span className={`text text_type_digits-default mr-2`}>
              {price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedDetails;
