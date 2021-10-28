import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import IngredientDetails from "../../components/ingredient-details";

import { SELECT_INGREDIENT } from "../../services/actions/ingredient-details";

import styles from "./ingredient.module.css";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.ingredients);
  const { ingredientId } = useParams();

  useEffect(() => {
    dispatch({
      type: SELECT_INGREDIENT,
      data: data.find((item) => item._id === ingredientId),
    });
  }, [dispatch, data, ingredientId]);

  return (
    <div className={styles.ingredient}>
      <h1 className="text text_type_main-large mt-10 mb-5">
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </div>
  );
};
