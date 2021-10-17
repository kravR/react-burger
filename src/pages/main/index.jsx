import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Container } from "../../components/container";
import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";

import { getIngredientsData } from "../../services/actions/burger-ingredients";

import styles from "./main.module.css";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  return (
    <Container>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.main}>
        {isLoading ? (
          <div>...загрузка</div>
        ) : isError ? (
          <div>Произошла ошибка при получении данных</div>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </div>
    </Container>
  );
};
