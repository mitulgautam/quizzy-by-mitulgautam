import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { initializeLogger } from "common/logger";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import PageLoader from "components/PageLoader";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    // setAuthHeaders(setLoading);
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
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
