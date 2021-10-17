import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./components/header";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  Page404,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "./pages";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
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
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/" exact>
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
