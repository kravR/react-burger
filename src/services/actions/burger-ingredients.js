import { API_URL_INGREDIENTS } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENT_COUNT = "INCREASE_INGREDIENT_COUNT";
export const DECREASE_INGREDIENT_COUNT = "DECREASE_INGREDIENT_COUNT";
export const CLEAR_BUN_COUNT = "CLEAR_BUN_COUNT";
export const CLEAR_INGREDIENTS_COUNT = "CLEAR_INGREDIENTS_COUNT";

export const getIngredientsData = () => (dispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });

  return fetch(API_URL_INGREDIENTS, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Что-то пошло не так.");
      }
      return response.json();
    })
    .then((response) => {
      if (response && response.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: response.data,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      });
    });
};
