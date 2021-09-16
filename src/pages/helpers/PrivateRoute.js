import React from "react";
import { Route, Redirect } from "react-router-dom";

// ...rest = berisikan path & exact
const PrivateRoute = ({ component: Component, socket, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Route
      {...rest} // path = "...." exact
      render={(props) =>
        // <Component {...props} /> = <BasicHome />
        isAuthenticated ? (
          <Component socket={socket} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
