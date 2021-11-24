import { RefObject } from "react";
import { IIngredientData } from "../../utils/types";

export interface ITabsData {
  id: string;
  title: string;
  refToSection: RefObject<HTMLDivElement>;
  data: Array<IIngredientData>;
}
