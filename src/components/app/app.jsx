import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "../app-header/app-header";
import Container from "../container/container";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredientsData } from "../../services/actions/burger-ingredients";

import styles from "./app.module.css";

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

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
          ) : isError ? (
            <div>Произошла ошибка при получении данных</div>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor data={data} />
            </DndProvider>
          )}
        </div>
      </Container>
    </>
  );
};

export default App;
