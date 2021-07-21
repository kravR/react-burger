import AppHeader from "../app-header/app-header";
import Container from "../container/container";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";

import { data } from '../../utils/data.js';

const App = () => {
  return (
    <>
      <AppHeader />
      <Container>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className={styles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor />
        </div>
      </Container>
    </>
  );
};

export default App;
