import { RefObject } from "react";
import { IIngredientData } from "../../services/types/data";

export interface ITabsData {
  id: string;
  title: string;
  refToSection: RefObject<HTMLDivElement>;
  data: Array<IIngredientData>;
}
