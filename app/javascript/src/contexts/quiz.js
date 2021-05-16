import React from "react";
import quizReducer from "reducers/quiz";

const QuizStateContext = React.createContext();
const QuizDispatchContext = React.createContext();

const intialState = {
  quizzes: [],
};

const QuizProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(quizReducer, intialState);
  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};

const useQuizState = () => {
  const context = React.useContext(QuizStateContext);
  if (context === undefined) {
    throw new Error("useQuizState must be used with in a QuizProvider");
  }
  return context;
};

const useQuizDispatch = () => {
  const context = React.useContext(QuizDispatchContext);
  if (context === undefined) {
    throw new Error("useQuizDispatch must be used within a QuizProvider");
  }
  return context;
};

const useQuiz = () => {
  return [useQuizState(), useQuizDispatch()];
};

export { QuizProvider, useQuizState, useQuizDispatch, useQuiz };
