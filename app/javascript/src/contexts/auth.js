import React from "react";
import authReducer from "reducers/auth";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const email = JSON.parse(localStorage.getItem("authEmail"));
const role = JSON.parse(localStorage.getItem("role"));

const intialState = {
  isLoggedIn: !!email,
  authEmail: email ? email : null,
  role: role ? role : null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, intialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used with in a AuthProvider");
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
  return context;
};

const useAuth = () => {
  return [useAuthState(), useAuthDispatch()];
};

export { AuthProvider, useAuthState, useAuthDispatch, useAuth };
