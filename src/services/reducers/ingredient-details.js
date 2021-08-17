import { 
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS
} from "../actions/ingredient-details";

const initialState = {
  data: {},
  visibleModal: false,
};

export const ingredient = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS:
      return {
        ...state,
        data: action.data,
        visibleModal: true
      };
    case CLOSE_INGREDIENT_DETAILS:
      return initialState;
    default:
      return state;
  }
};