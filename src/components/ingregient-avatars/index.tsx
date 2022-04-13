import { FC } from "react";

import IngredientAvatar from "../ingregient-avatar";

import { IProps } from "./types";
import styles from "./styles.module.css";

const IngredientAvatars: FC<IProps> = ({ items, max }) => (
  <div className={styles.avatars}>
    {items && items.length > max && (
      <div
        className={styles["avatar-wrap"]}
        key={items[items.length - max]?._id}
      >
        <div className={styles.bg}></div>
        <IngredientAvatar
          image={items[items.length - max]?.image_mobile}
          alt={items[items.length - max]?.name}
        />
        <span className={`${styles.more} text text_type_digits-default`}>
          {`+${items.length - max}`}
        </span>
      </div>
    )}
    {items &&
      items.slice(items.length - max, items.length).map((item) => (
        <div className={styles["avatar-wrap"]} key={item?._id}>
          <IngredientAvatar image={item?.image_mobile} alt={item?.name} />
        </div>
      ))}
  </div>
);

export default IngredientAvatars;
