import { FC } from "react";

import styles from "./styles.module.css";

export const Container: FC = ({ children }) => (
  <main className={styles.container}>{children}</main>
);
