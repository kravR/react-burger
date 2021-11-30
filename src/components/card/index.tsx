import { FC } from "react";
import { useDrag } from "react-dnd";

import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IProps } from "./types";
import styles from "./styles.module.css";

const Card: FC<IProps> = ({ data, onDetail }) => {
  const [{ opacity }, ref] = useDrag({
    type: "item",
    item: { ...data },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    }),
  });

  return (
    <article
      className={styles.card}
      onClick={() => onDetail(data?._id)}
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

      {(!!data?.qty && data.qty > 0) && <Counter count={data?.qty} size="default" />}
    </article>
  );
};

export default Card;
