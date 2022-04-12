import { FC, useEffect, SyntheticEvent } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { useDispatch } from '../../services/hooks';

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
import FeedDetails from "../feed-details";
import Modal from "../modal";
import { Container } from "../container";

import { getIngredientsData } from "../../services/actions/burger-ingredients";

import { ILocationState } from "../../services/types/data";

const App: FC = () => {
  const history = useHistory();
  const location = useLocation<ILocationState>();
  const dispatch = useDispatch();
 
  const action = history.action === "PUSH" || history.action === "REPLACE";
  const background = action && location.state && location.state.background;

  const closeModal = (event: Event | SyntheticEvent | undefined) => {
    event?.stopPropagation();
    history.goBack();
  };

  useEffect(() => {
    dispatch(getIngredientsData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
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
          <Route path="/feed" exact>
            <FeedPage />
          </Route>
          <Route path={"/feed/:feedId"} exact>
            <FeedDetails />
          </Route>
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
      </Container>

      {background && (
        <>
          <Route path={"/ingredients/:ingredientId"}>
            <Modal onClose={closeModal} title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>
        
          <Route path={"/feed/:orderId"}>
            <Modal onClose={closeModal}>
              <FeedDetails />
            </Modal>
          </Route>
        </>
      )}
    </>
  );
};

export default App;