import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { IProps } from "./types";

export const ProtectedRoute: FC<IProps> = ({ children, ...props }) => {
  const { isAuthorized } = useSelector((store: any) => store.auth);

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
