import { IIngredientData } from "../types/data";

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  CLEAR_INGREDIENTS_COUNT,
  CLEAR_BUN_COUNT,
  TBurgerIngredientsActions,
} from "../actions/burger-ingredients";

interface IBurgerIngredientsState {
  ingredients: Array<IIngredientData>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IBurgerIngredientsState = {
  ingredients: [],
  isLoading: false,
  isError: false,
};

export const ingredients = (
  state = initialState,
  action: TBurgerIngredientsActions
): IBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        ingredients: [...(action.ingredients as Array<IIngredientData>)].map(
          (item) => ({ ...item, qty: 0 })
        ),
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredients: [],
        isLoading: false,
        isError: true,
      };
    case INCREASE_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: [...(state.ingredients as Array<IIngredientData>)].map(
          (item) => {
            const qty = item.qty ? item.qty : 0;
            return item._id === action.id
              ? { ...item, qty: qty + action.qty }
              : item;
          }
        ),
      };
    case DECREASE_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: [...(state.ingredients as Array<IIngredientData>)].map(
          (item) => {
            const qty = item.qty ? item.qty : 0;

            return item._id === action.id
              ? { ...item, qty: qty - action.qty }
              : item;
          }
        ),
      };
    case CLEAR_BUN_COUNT:
      return {
        ...state,
        ingredients: [...(state.ingredients as Array<IIngredientData>)].map(
          (item) => (item.type === "bun" ? { ...item, qty: 0 } : item)
        ),
      };
    case CLEAR_INGREDIENTS_COUNT:
      return {
        ...state,
        ingredients: [...(state.ingredients as Array<IIngredientData>)].map(
          (item) => (item.qty ? { ...item, qty: 0 } : item)
        ),
      };
    default:
      return state;
  }
};
