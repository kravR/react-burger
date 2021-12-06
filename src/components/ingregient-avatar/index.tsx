import { FC } from "react";

import { IProps } from "./types";
import styles from "./styles.module.css";

const IngredientAvatar: FC<IProps> = ({ image, alt }) => {
  return (
    <div className={styles.avatar}>
      <img src={image} alt={alt} className={styles.img} />
    </div>
  );
};

export default IngredientAvatar;
