import { IIngredientData } from "../types/data";

import {
  ADD_BUN,
  DELETE_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENTS,
  RESET_CONSTRUCTOR,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";

interface IBurgerConstructorState {
  bun: IIngredientData | null;
  filling: IIngredientData[];
}

export const initialState: IBurgerConstructorState = {
  bun: null,
  filling: [],
};

export const burger = (
  state = initialState,
  action: TBurgerConstructorActions
): IBurgerConstructorState => {
  switch (action.type) {
    case ADD_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case DELETE_BUN:
      return {
        ...state,
        bun: null,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        filling: [
          ...state.filling,
          { ...action.item, uuid: new Date().getTime() + action.item._id },
        ],
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        filling: [...(state.filling as Array<IIngredientData>)].filter(
          (item) => item.uuid !== action.id
        ),
      };
    case SORT_INGREDIENTS:
      const arr = [...state.filling];
      const dragItem = arr[action.dragIndex];
      const hoverItem = arr[action.hoverIndex];
      arr[action.hoverIndex] = dragItem;
      arr[action.dragIndex] = hoverItem;
      return {
        ...state,
        filling: arr,
      };
    case RESET_CONSTRUCTOR:
      return initialState;
    default:
      return state;
  }
};
