import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import attemptApi from "apis/attempt";
import PageLoader from "components/PageLoader";
import Button from "components/Button";

const ResultQuiz = ({ match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [questionAttempts, setQuestionAttempts] = useState([]);
  const [quiz, setQuiz] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);

  useEffect(async () => {
    try {
      const {
        data: {
          attempt: { quiz, attempt_answers, incorrect, correct },
        },
      } = await attemptApi.result(history.location.state);
      setQuiz(quiz);
      var tempQuestions = [];
      quiz.questions.map((question, i) => {
        tempQuestions.push({
          id: question.id,
          name: question.name,
          correct_option: question.correct_option,
          options: question.options,
          attempt_option: attempt_answers[i].option_id,
          question_id: attempt_answers[i].question_id,
        });

        setCorrectAnswer(correct);
        setIncorrectAnswer(incorrect);
      });
      setQuestionAttempts(tempQuestions);
    } catch (e) {
      logger.error(e);
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
    <div>
      <div className="p-8">
        <div className="text-2xl font-medium text-indigo-500 p-1">
          {quiz.name}
        </div>
        <div className="p-1 ml-4 text-lg text-gray-700">
          Thank you for taking the quiz, here are your results.
          <br />{" "}
          <div>
            {"You have submitted " +
              correctAnswer +
              " correct and " +
              incorrectAnswer +
              " incorrect answers."}
          </div>
        </div>
        {questionAttempts.map((question, i) => (
          <div key={question.id} className="p-4">
            <div className="flex flex-row">
              <div className="text-lg font-bold w-4/5">
                {i + 1 + ". " + question.name}
              </div>
            </div>
            <div>
              {question.options.map((option, i) => (
                <div key={option.id} className="flex flex-row ml-8 mt-2">
                  <div className="w-32 text-gray-500">{`Option ${i + 1}`}</div>
                  <div className="p-1">
                    <input
                      type="radio"
                      className={option.name}
                      name={question.id}
                      value={question.attempt_option}
                      checked={option.id === question.attempt_option}
                      disabled={true}
                    ></input>
                  </div>
                  <div className="p-1">{option.name}</div>
                  {i + 1 === question.correct_option && (
                    <div className="text-green-500 ml-2 pt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultQuiz;
