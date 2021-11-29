import { IIngredientData } from "../../services/types/data";

export interface IProps {
  data: IIngredientData;
  onDetail: (id: string) => void;
}
