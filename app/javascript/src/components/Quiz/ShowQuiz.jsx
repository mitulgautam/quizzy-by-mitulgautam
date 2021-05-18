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

  const handleDelete = async () => {
    try {
      setIsDelete(true);
      await questionApi.destroy(deleteQuestionID);
      setQuestions(
        questions.filter((question) => question.id !== deleteQuestionID)
      );
      setIsDelete(false);
      setDeleteQuestionID("");
    } catch (e) {
      logger.error(e);
    } finally {
      setIsDelete(false);
      setModalIsOpen(false);
    }
  };
  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
        className="w-min h-min"
      >
        <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
          <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div className="md:flex items-center">
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <p className="font-bold">
                  Are you sure you want to delete question?
                </p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                disabled={isDelete}
                onClick={handleDelete}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              >
                {isDelete ? <div>Deleting</div> : <div>Delete</div>}
              </button>
              {!isDelete && (
                <button
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                  onClick={() => setModalIsOpen(false)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <div className="w-36 ml-auto flex flex-row">
        <Button
          type="button"
          buttonText="Add new question"
          onClick={() => {
            history.push(`/quiz/${id}/create-question`);
          }}
          loading={false}
        />
        {questions.length > 0 && (
          <div className="ml-2">
            <Button
              type="button"
              buttonText="Publish"
              onClick={() => {}}
              loading={false}
            />
          </div>
        )}
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
                <div className="text-lg font-bold w-4/5">
                  {i + 1 + ". " + question.name}
                </div>
                <button
                  onClick={() => {
                    history.push(`/quiz/${id}/update-question/${question.id}`);
                  }}
                  className="outline-none focus:outline-none focus:ring px-2 py-1 border-blue-500 border-2 text-blue-500 ml-16 h-12"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteQuestionID(question.id);
                    setModalIsOpen(true);
                  }}
                  className="outline-none focus:outline-none focus:ring px-2 py-1 border-red-500 border-2 text-red-500 ml-4 h-12"
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
