import { FC, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import { useDispatch } from '../../services/hooks';

import {
  IngredientPage,
  FeedPage,
  MainPage,
  LoginPage,
  OrderPage,
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
import OrderDetails from "../order-details";
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
          <Route path={"/feed/:orderId"} exact>
            <OrderPage />
          </Route>
          <ProtectedRoute path="/profile" exact>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:orderId" exact>
            <OrderPage />
          </ProtectedRoute>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </Container>

      {background && (
        <>
          <ProtectedRoute path={"/create-order"}>
            <Modal>
              <OrderDetails />
            </Modal>
          </ProtectedRoute>

          <Route path={"/ingredients/:ingredientId"}>
            <Modal title="Детали ингредиента">
              <IngredientDetails />
            </Modal>
          </Route>

          <Route path={"/feed/:orderId"}>
            <Modal>
              <FeedDetails />
            </Modal>
          </Route>

          <ProtectedRoute path={"/profiles/orders/:orderId"}>
            <Modal>
              <FeedDetails />
            </Modal>
          </ProtectedRoute>
        </>
      )}
    </>
  );
};

export default App;
