import { IIngredientData } from "../types/data";

import {
  SELECT_INGREDIENT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  TIngredientDetailsActions,
} from "../actions/ingredient-details";

interface IIngredientDetailsState {
  ingredient: IIngredientData | {};
  visibleModal: boolean;
}

const initialState = {
  ingredient: {},
  visibleModal: false,
};

export const ingredient = (
  state = initialState,
  action: TIngredientDetailsActions
): IIngredientDetailsState => {
  switch (action.type) {
    case SELECT_INGREDIENT:
      return {
        ...state,
        ingredient: action.ingredient,
      };
    case OPEN_INGREDIENT_DETAILS:
      return {
        ...state,
        visibleModal: true,
      };
    case CLOSE_INGREDIENT_DETAILS:
      return initialState;
    default:
      return state;
  }
};
