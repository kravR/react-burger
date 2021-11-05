import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  CLEAR_INGREDIENTS_COUNT,
  CLEAR_BUN_COUNT,
} from "../actions/burger-ingredients";

const initialState = {
  ingredients: [],
  isLoading: false,
  isError: false,
};

export const ingredients = (state = initialState, action) => {
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
        ingredients: action.ingredients,
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
        ingredients: state.ingredients.map((item) => {
          const qty = item.qty ? item.qty : 0;
          return item._id === action.id
            ? { ...item, qty: qty + Number(action.qty) }
            : item;
        }),
      };
    case DECREASE_INGREDIENT_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item._id === action.id
            ? { ...item, qty: item.qty - action.qty }
            : item
        ),
      };
    case CLEAR_BUN_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item.type === "bun" ? { ...item, qty: null } : item
        ),
      };
    case CLEAR_INGREDIENTS_COUNT:
      return {
        ...state,
        ingredients: state.ingredients.map((item) =>
          item.qty ? { ...item, qty: null } : item
        ),
      };
    default:
      return state;
  }
};
