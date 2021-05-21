/* eslint-disable arrow-parens */
import React, { useState, useEffect } from "react";
import Button from "components/Button";
import PageLoader from "components/PageLoader";
import QuizList from "./QuizList";
import quizApi from "apis/quiz";
import Modal from "react-modal";
import { useQuizState } from "contexts/quiz";
import { useQuizDispatch } from "contexts/quiz";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedQuizID, setSelectedQuizID] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const quizDispatch = useQuizDispatch();
  const { quizzes } = useQuizState();

  const handleCreateQuiz = () => {
    window.location.href = "/create-quiz";
  };

  const handleConfirmDelete = async () => {
    setIsDelete(true);
    try {
      const { data } = await quizApi.destroy(selectedQuizID);
      quizDispatch({ type: "UPDATE_QUIZ", payload: { quizzes: data.quizzes } });
    } catch (err) {
      logger.error(err);
    } finally {
      setIsDelete(false);
      setModalIsOpen(false);
    }
  };

  useEffect(async () => {
    try {
      const { data } = await quizApi.index();
      quizDispatch({ type: "UPDATE_QUIZ", payload: { quizzes: data.quizzes } });
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
    <div className="flex flex-col">
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
                  Are you sure you want to delete quiz?
                </p>
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
              <button
                disabled={isDelete}
                onClick={handleConfirmDelete}
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
      <div className="w-32 ml-auto mr-8">
        <Button
          type="button"
          buttonText="Add new quiz"
          onClick={handleCreateQuiz}
          loading={false}
        />
      </div>
      <div className="p-16 w-full">
        <div className="font-bold text-2xl text-gray-700">List of Quizzes</div>
        <QuizList
          quizzes={quizzes}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setSelectedQuizID={setSelectedQuizID}
        />
      </div>
    </div>
  );
}

export default Dashboard;
