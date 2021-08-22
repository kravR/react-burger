import { combineReducers } from "redux";
import { ingredients } from "./burger-ingredients";
import { burger } from "./burger-constructor";
import { ingredient } from "./ingredient-details";
import { order } from "./order";

export const rootReducer = combineReducers({
  ingredients,
  burger,
  ingredient,
  order,
});
