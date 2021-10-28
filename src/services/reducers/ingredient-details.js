import {
  SELECT_INGREDIENT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";

const initialState = {
  data: {},
  visibleModal: false,
};

export const ingredient = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT:
      return {
        ...state,
        data: action.data,
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
