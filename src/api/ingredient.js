import * as publicApi from "./common/publicApi";

export function getIngredients(data) {
  return publicApi.get("ingredients", data).then((response) => response.data);
}
