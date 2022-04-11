import { SyntheticEvent } from 'react';

export interface IProps {
  title?: string;
  onClose: (e?: KeyboardEvent | Event | SyntheticEvent | undefined) => void;
}
