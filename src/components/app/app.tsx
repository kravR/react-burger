import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={`${styles.main} pt-10`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={styles.main__container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
};

export default App;
