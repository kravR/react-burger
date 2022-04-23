import { IIngredientData } from "../types/data";

import {
  SELECT_INGREDIENT,
  TIngredientDetailsActions,
} from "../actions/ingredient-details";

interface IIngredientDetailsState {
  ingredient: IIngredientData | null;
}

export const initialState: IIngredientDetailsState = {
  ingredient: null,
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
    default:
      return state;
  }
};
