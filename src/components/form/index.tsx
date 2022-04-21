import { FC } from "react";

import { IProps } from "./types";

import styles from "./styles.module.css";

export const Form: FC<IProps> = (props) => (
  <form {...props} className={styles.wrapper} />
);
