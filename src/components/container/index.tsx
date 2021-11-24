import { FC } from "react";

import styles from "./container.module.css";

export const Container: FC = ({ children }) => (
  <main className={styles.container}>{children}</main>
);
