import { IIngredientData } from "../../utils/types";

export interface IProps {
  data: IIngredientData;
  onDetail: (id: string) => void;
}
