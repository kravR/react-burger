import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import IngredientDetails from "../../components/ingredient-details";

import { SELECT_INGREDIENT } from "../../services/actions/ingredient-details";

import { useDispatch, useSelector } from '../../services/hooks';

import styles from "./ingredient.module.css";

export const IngredientPage: FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store: any) => store.ingredients);
  const { ingredientId } = useParams();

  useEffect(() => {
    dispatch({
      type: SELECT_INGREDIENT,
      ingredient: ingredients.find((item) => item._id === ingredientId),
    });
  }, [dispatch, ingredients, ingredientId]);

  return (
    <div className={styles.ingredient}>
      <h1 className="text text_type_main-large mt-10 mb-5">
        Детали ингредиента
      </h1>
      <IngredientDetails />
    </div>
  );
};
