/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
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
import { CreateQuiz } from "./Quiz/CreateQuiz";
import authenticationApi from "apis/authentication";
import { useUserDispatch } from "contexts/user";
import { useUserState } from "contexts/user";
import { UpdateQuiz } from "./Quiz/UpdateQuiz";
import history from "common/history";

const Main = (props) => {
  const [loading, setLoading] = useState(true);
  const { authEmail } = useAuthState();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const isLoggedIn = !either(isNil, isEmpty)(authEmail);
  const { user } = useUserState();

  useEffect(async () => {
    initializeLogger();
    setAuthHeaders(setLoading);
    registerIntercepts(authDispatch);

    try {
      if (JSON.parse(localStorage.getItem("authEmail")) !== null) {
        const { data } = await authenticationApi.show();
        userDispatch({ type: "SET_USER", payload: { user: data } });
      }
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter history={history}>
      <section>
        <NavBar />
      </section>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/create-quiz" component={CreateQuiz} />
        <Route exact path="/update-quiz/:id" component={UpdateQuiz} />
        {isLoggedIn && <Route exact path="/" component={Dashboard} />}
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
