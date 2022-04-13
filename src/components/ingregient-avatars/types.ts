import { IIngredientData } from "../../services/types/data";

export interface IProps {
  max: number;
  items: Array<IIngredientData | undefined>;
}
