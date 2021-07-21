import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { cardObj } from "../../utils/types";

import styles from "./card.module.css";

const Card = ({ data }) => {
  return (
    <article className={styles.card}>
      <img src={data.image} alt={data.name} className={styles.card__img} />
      <div className={`${styles.card__price} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-1">{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.card__title} text text_type_main-default`}>
        {data.name}
      </h3>
      <Counter count={1} size="default" />
    </article>
  );
};

Card.propTypes = {
  data: cardObj,
};

export default Card;
