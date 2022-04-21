import * as publicApi from "./core/publicApi";

import { IIngredientData } from "../../services/types/data";

export function getIngredients(): Promise<Array<IIngredientData>> {
  return publicApi.get("ingredients").then((response) => response.data);
}
