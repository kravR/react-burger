import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

import { store } from "../store";

import { TAuthActions } from "../actions/auth";
import { TBurgerConstructorActions } from "../actions/burger-constructor";
import { TBurgerIngredientsActions } from "../actions/burger-ingredients";
import { TIngredientDetailsActions } from "../actions/ingredient-details";
import { TOrderActions } from "../actions/order";
import { TWSActions } from "../actions/wsActions";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TAuthActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TIngredientDetailsActions
  | TOrderActions
  | TWSActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
