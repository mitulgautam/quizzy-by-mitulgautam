/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "components/Login/Login";
import { initializeLogger } from "common/logger";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import PageLoader from "components/PageLoader";
import Dashboard from "components/Dashboard/Dashboard";
import NavBar from "components/NavBar";
import PrivateRoute from "components/Common/PrivateRoute";
import { useAuthDispatch, useAuthState } from "contexts/auth";
import { either, isEmpty, isNil } from "ramda";

// import { UserProvider } from "contexts/user";
const Main = (props) => {
  const [loading, setLoading] = useState(true);
  const { authEmail } = useAuthState();
  const authDispatch = useAuthDispatch();
  const isLoggedIn = !either(isNil, isEmpty)(authEmail);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    registerIntercepts(authDispatch);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <section>
        <NavBar />
      </section>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        {isLoggedIn && <Route exact path="/" component={Dashboard} />}
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default Main;
