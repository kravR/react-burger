import { useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
//import { getOrder } from "../../services/actions/orders";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { useSelector } from "../../services/hooks";

import styles from "./feed-details.module.css";

const FeedDetails = () => {
  const { orderId }: { orderId: string } = useParams();
  //const dispatch = useDispatch();
  const { orders } = useSelector((store: any) => store.ordersFeed);
  const { ingredients } = useSelector((store: any) => store.ingredients);

  // useEffect(() => {
  //   if (orders.length === 0) {
  //     dispatch(getOrder(id));
  //   }
  // }, [dispatch, orders, id])

  const order = orders.find((item) => item.number === parseInt(orderId, 10));

  // const uniqueOrderIngredients = Array.from(new Set(order?.ingredients));

  // const orderIngredients = useMemo(() => {
  //   return uniqueOrderIngredients.map((ingredient) => {
  //     return ingredients.find((item) => item._id === ingredient);
  //   });
  // }, [uniqueOrderIngredients, ingredients]);

  const orderIngredients = useMemo(() => {
    return Array.from(new Set(order?.ingredients)).map((ingredient) => {
      return ingredients.find((item) => item._id === ingredient);
    });;
  }, [order, ingredients])

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

  console.log(order);
  console.log(orderIngredients);

  return (
    <>
      {order && orderIngredients.length > 0 ? (
        <div className={`${styles.feed}`}>
          <p className={`text text_type_digits-default ${styles.title}`}>
            #{order?.number}
          </p>
          <p className={`text text_type_main-medium  mt-10`}>{order?.name}</p>
          <p className={`text text_type_main-default text_color_success mt-2`}>
            {order?.status === "done" ? "Выполнен" : "В работе"}
          </p>
          <p className={`text text_type_main-medium mt-15 mb-6`}>Состав:</p>
          <div className={`${styles.ingredients} custom-scroll`}>
            {orderIngredients &&
              orderIngredients.map((item, index) => {
                return (
                  <div key={index} className={`${styles.ingredient}`}>
                    <div className={`${styles.ingredient__info}`}>
                      <img
                        src={item?.image_mobile}
                        alt=""
                        className={`${styles.ingredient__image}`}
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
            <p
              className={`text text_type_main-default ml-4 text_color_inactive`}
            >
              {formatTimeAgo(order?.createdAt)}
            </p>
            <div className={`total__${styles.ingredient__price}`}>
              <span className={`text text_type_digits-default mr-2`}>
                {price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text text_type_main-default mt-10 mb-5">...загрузка</h3>
      )}
    </>
  );
};

export default FeedDetails;
