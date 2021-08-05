import AppHeader from "../app-header/app-header";
import Container from "../container/container";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { useFetch } from '../../hooks/useFetch';

import { API_URL_INGREDIENTS } from '../../utils/constants';

import styles from "./app.module.css";

const App = () => {
  const { data, isLoading, isError } = useFetch(API_URL_INGREDIENTS);

  return (
    <>
      <AppHeader />
      <Container>
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className={styles.main}>
          {isLoading ? (
            <div>...загрузка</div>
          ): (
            isError ? (
              <div>Произошла ошибка при получении данных</div>
            ): (
              <>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
              </>
            )
          )}          
        </div>
      </Container>
    </>
  );
};

export default App;
