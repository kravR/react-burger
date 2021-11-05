import styles from "./container.module.css";

export const Container = ({ children }) => (
  <main className={styles.container}>
    {children}
  </main>
);
