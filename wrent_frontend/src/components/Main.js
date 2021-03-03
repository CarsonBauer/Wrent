import React from "react";
import { routes } from "../constants/routes";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Page from "../components/navigation/Page";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "../themes/themes";
// import {generateAppRoutes} from "./navigation/utils";
import PrivateRoute from "./auth/PrivateRoute";
import SignIn from "./auth/SignIn";
import { AuthContext } from "./auth/auth";
import Home from "./home";
import SignUp from "./auth/SignUp";
import ForgotPassWord from "./auth/ForgotPassWord";

export default function Main() {
  return (
    <AuthContext.Provider value={false}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            {routes.map((route) => (
              <PrivateRoute
                key={route.path}
                path={route.path}
                isPrivate={route.private}
              >
                <Page route={route} />
              </PrivateRoute>
            ))}
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgotpassword" component={ForgotPassWord} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </AuthContext.Provider>
  );
}