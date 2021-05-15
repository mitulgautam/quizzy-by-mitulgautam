/* eslint-disable arrow-parens */
import React, { useState } from "react";
import Button from "components/Button";
import quizApi from "apis/quiz";

export const CreateQuiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  const _handleCreateQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await quizApi.create({ quiz: { name } });
      if (response.status === 200) {
        setName("");
      }
      window.location.href = "/";
    } catch (err) {
      logger.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-16">
      <div className="text-2xl font-bold text-gray-700">Add new Quiz</div>
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
              buttonText="Create"
              onClick={_handleCreateQuiz}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
