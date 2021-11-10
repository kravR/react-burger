import { FC, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  IngredientPage,
  FeedPage,
  MainPage,
  LoginPage,
  RegisterPage,
  Page404,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "../../pages";

import { Header } from "../header";
import { ProtectedRoute } from "../protected-route";
import IngredientDetails from "../ingredient-details";
import Modal from "../modal";
import { Container } from "../container";

import { getIngredientsData } from "../../services/actions/burger-ingredients";
import { CLOSE_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details";

import { ILocationState } from "../../utils/types";

const App: FC = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const dispatch = useDispatch();

  const { visibleModal } = useSelector((store: any) => store.ingredient);
  const { isLoading, isError } = useSelector((store: any) => store.ingredients);

  const action = history.action === "PUSH" || history.action === "REPLACE";
  const background = action && location.state && location.state.background;

  const closeModal = () => {
    dispatch({
      type: CLOSE_INGREDIENT_DETAILS,
    });
  };

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        {isLoading ? (
          <h3 className="text text_type_main-default mt-10 mb-5">
            ...загрузка
          </h3>
        ) : isError ? (
          <h3 className="text text_type_main-default mt-10 mb-5">
            Произошла ошибка при получении данных
          </h3>
        ) : (
          <Switch location={background || location}>
            <Route path="/404" exact>
              <Page404 />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPassword />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword />
            </Route>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path={"/ingredients/:ingredientId"} exact>
              <IngredientPage />
            </Route>
            <ProtectedRoute path="/feed" exact>
              <FeedPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact>
              <Profile />
            </ProtectedRoute>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
        )}
      </Container>

      {visibleModal && background && (
        <Route path={"/ingredients/:ingredientId"}>
          <Modal onClose={closeModal} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
};

export default App;
