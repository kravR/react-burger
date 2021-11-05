import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, ...props }) => {
  const { isAuthorized } = useSelector((store) => store.auth);

  return (
    <Route
      {...props}
      render={({ location }) => {
        return isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
