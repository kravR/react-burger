import styles from "./container.module.css";

const Container = ({ children }) => (
  <main className={styles.container}>
    {children}
  </main>
);

export default Container;
