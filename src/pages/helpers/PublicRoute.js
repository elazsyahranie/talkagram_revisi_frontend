import React from "react";
import { Route, Redirect } from "react-router-dom";

// ...rest = berisikan path & exact
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <Route
      {...rest} // path = "...." exact
      render={(props) =>
        // <Component {...props} /> = <BasicHome {...props} />
        // isAuthenticated = jika user sudah login (true)
        // restricted = jika user sudah login maka tidak masuk ke halaman tersebut (false)
        isAuthenticated && restricted ? (
          <Redirect to="/landing-page" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
