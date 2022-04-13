import { combineReducers } from "redux";
import { ingredients } from "./burger-ingredients";
import { burger } from "./burger-constructor";
import { ingredient } from "./ingredient-details";
import { order } from "./order";
import { auth } from "./auth";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  auth,
  ingredients,
  burger,
  ingredient,
  order,
  ordersFeed: wsReducer,
});
