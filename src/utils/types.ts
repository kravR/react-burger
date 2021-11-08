import { Location } from "history";

export interface ILocationState {
  from?: Location;
  background?: Location;
};

export interface IIngredientData {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  qty?: number;
  uuid?: string;
}

