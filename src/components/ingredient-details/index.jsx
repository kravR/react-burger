import { useSelector } from 'react-redux';

import styles from "./ingredient-details.module.css";

const IngredientDetails = () => {
  const { data } = useSelector(store => store.ingredient);

  return (
    <div className={styles.ingredient}>
      <img
        className={`${styles.ingredient__image} mb-4`}
        src={data?.image_large}
        alt={data?.name}
        width="480px"
        height="240px"
      />
      <h3 className="text text_type_main-medium mb-8">{data?.name}</h3>
      <div className={styles.ingredient__items}>
        <div className={`${styles.ingredient__item} mr-5`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data?.calories}
          </span>
        </div>
        <div className={`${styles.ingredient__item} mr-5`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data?.proteins}
          </span>
        </div>
        <div className={`${styles.ingredient__item} mr-5`}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data?.fat}
          </span>
        </div>
        <div className={styles.ingredient__item}>
          <span className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data?.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
