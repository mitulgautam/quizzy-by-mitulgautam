/* eslint-disable arrow-parens */
import React from "react";

import Main from "components/Main";

import { AuthProvider } from "contexts/auth";

const App = (props) => {
  return (
    <AuthProvider>
      <Main {...props} />
    </AuthProvider>
  );
};

export default App;
