import * as ingredientService from "../../api/http/ingredient";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENT_COUNT = "INCREASE_INGREDIENT_COUNT";
export const DECREASE_INGREDIENT_COUNT = "DECREASE_INGREDIENT_COUNT";
export const CLEAR_BUN_COUNT = "CLEAR_BUN_COUNT";
export const CLEAR_INGREDIENTS_COUNT = "CLEAR_INGREDIENTS_COUNT";

export const getIngredientsData = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return ingredientService
    .getIngredients()
    .then((ingredients) =>
      dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients })
    )
    .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
};
