/* eslint-disable arrow-parens */
import React from "react";

import Main from "./components/Main";

import { AuthProvider } from "contexts/auth";
import { UserProvider } from "contexts/user";
import { QuizProvider } from "contexts/quiz";

const App = (props) => {
  return (
    <AuthProvider>
      <UserProvider>
        <QuizProvider>
          <Main {...props} />
        </QuizProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
