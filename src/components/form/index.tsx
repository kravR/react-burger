import { FC } from "react";

import styles from "./form.module.css";

export const Form: FC = (props) => (
  <form {...props} className={styles.wrapper} />
);
