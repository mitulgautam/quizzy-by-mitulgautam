/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import Button from "components/Button";
import quizApi from "apis/quiz";
import PageLoader from "components/PageLoader";
import { useHistory } from "react-router-dom";

export const UpdateQuiz = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const id = match.params.id;
  const history = useHistory();

  const _handleUpdateQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await quizApi.update(id, { quiz: { name } });
      if (response.status === 200) {
        setName("");
      }
      history.push("/");
    } catch (err) {
      logger.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    try {
      const {
        data: {
          quiz: { name },
        },
      } = await quizApi.show(id);
      setName(name);
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
    <div className="m-16">
      <div className="text-2xl font-bold text-gray-700">Update Quiz</div>
      <div className="flex flex-row p-4">
        <label htmlFor="quiz-name" className="pt-2 text-xl text-gray-500">
          Name
        </label>
        <div className="flex flex-col pl-4 w-2/5">
          <div className="mb-3 pt-0">
            <input
              type="text"
              name="quiz-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              id="quiz-name"
              className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="w-24">
            <Button
              buttonText="Update"
              onClick={_handleUpdateQuiz}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
