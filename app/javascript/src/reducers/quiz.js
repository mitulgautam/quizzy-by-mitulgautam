/* eslint-disable indent */
const quizReducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_QUIZ": {
      return {
        quizzes: payload.quizzes,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default quizReducer;
