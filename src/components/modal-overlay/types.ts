import { SyntheticEvent } from "react";

export interface IProps {
  onClose: (e?: Event | SyntheticEvent) => void;
}
