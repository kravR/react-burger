import { FC } from "react";

import { useSelector } from "../../services/hooks";

import styles from "./styles.module.css";

const IngredientDetails: FC = () => {
  const { ingredient = null } = useSelector((store) => store.ingredient);

  return (
    <div className={styles.ingredient}>
      {ingredient && (
        <>
          <img
            className={`${styles.ingredient__image} mb-4`}
            src={ingredient?.image_large ?? ""}
            alt={ingredient?.name}
            width="480px"
            height="240px"
          />
          <h3 className="text text_type_main-medium mb-8">
            {ingredient?.name}
          </h3>
          <div className={styles.ingredient__items}>
            <div className={`${styles.ingredient__item} mr-5`}>
              <span className="text text_type_main-default text_color_inactive mb-2">
                Калории,ккал
              </span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingredient?.calories}
              </span>
            </div>
            <div className={`${styles.ingredient__item} mr-5`}>
              <span className="text text_type_main-default text_color_inactive mb-2">
                Белки, г
              </span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingredient?.proteins}
              </span>
            </div>
            <div className={`${styles.ingredient__item} mr-5`}>
              <span className="text text_type_main-default text_color_inactive mb-2">
                Жиры, г
              </span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingredient?.fat}
              </span>
            </div>
            <div className={styles.ingredient__item}>
              <span className="text text_type_main-default text_color_inactive mb-2">
                Углеводы, г
              </span>
              <span className="text text_type_digits-default text_color_inactive">
                {ingredient?.carbohydrates}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientDetails;
