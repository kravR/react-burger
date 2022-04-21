import { FC } from "react";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from "react-router-dom";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { SELECT_INGREDIENT } from "../../services/actions/ingredient-details";
import { useDispatch } from "../../services/hooks";

import { IProps } from "./types";
import styles from "./styles.module.css";

const Card: FC<IProps> = ({ data }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: "item",
    item: { ...data },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  const handleCardDetail = (id: string) => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient: data,
    });
    history.push({
      pathname: `ingredients/${id}`,
      state: { background: location },
    });
  };

  return (
    <article
      className={styles.card}
      onClick={() => handleCardDetail(data?._id)}
      ref={ref}
      style={{ opacity }}
    >
      <img src={data?.image} alt={data?.name} className={styles.card__img} />
      <div className={`${styles.card__price} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-1">
          {data?.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.card__title} text text_type_main-default`}>
        {data?.name}
      </h3>

      {!!data?.qty && data.qty > 0 && (
        <Counter count={data?.qty} size="default" />
      )}
    </article>
  );
};

export default Card;
