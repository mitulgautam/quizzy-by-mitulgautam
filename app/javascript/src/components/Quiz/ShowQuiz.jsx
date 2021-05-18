/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import quizApi from "apis/quiz";
import questionApi from "apis/question";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import Modal from "react-modal";

const ShowQuiz = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteQuestionID, setDeleteQuestionID] = useState("");

  useEffect(async () => {
    try {
      const {
        data: { quiz_question },
      } = await quizApi.show(id);
      setName(quiz_question.name);
      setQuestions(quiz_question.questions);
      // eslint-disable-next-line no-console
      console.log(quiz_question.questions);
    } catch (err) {
      logger.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <div className="w-36 ml-auto">
        <Button
          type="button"
          buttonText="Add new question"
          onClick={() => {
            history.push(`/quiz/${id}/create-question`);
          }}
          loading={false}
        />
      </div>
      <div className="text-2xl font-medium text-gray-700">{name}</div>
      {questions.length === 0 ? (
        <div className="mx-auto my-64 text-gray-500">
          There are no quiz in this solar system.
        </div>
      ) : (
        <div className="p-2">
          {questions.map((question, i) => (
            <div key={question.id} className="p-4">
              <div className="flex flex-row">
                <div className="text-lg font-bold">
                  {i + 1 + ". " + question.name}
                </div>
                <button className="outline-none focus:outline-none focus:ring px-2 py-1 border-blue-500 border-2 text-blue-500 ml-16">
                  Edit
                </button>
                <button
                  onClick={() => {
                    null;
                  }}
                  className="outline-none focus:outline-none focus:ring px-2 py-1 border-red-500 border-2 text-red-500 ml-8"
                >
                  Delete
                </button>
              </div>
              <div>
                {question.options.map((option, i) => (
                  <div key={option.id} className="flex flex-row ml-8 mt-2">
                    <div className="w-32 text-gray-500">{`Option ${
                      i + 1
                    }`}</div>
                    <div>{option.name}</div>
                    {i + 1 === question.correct_option && (
                      <div className="text-green-500 ml-2">
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
      )}
    </div>
  );
};

export default ShowQuiz;
