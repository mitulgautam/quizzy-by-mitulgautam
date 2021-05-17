/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import PageLoader from "components/PageLoader";
import { useHistory } from "react-router-dom";
import quizApi from "apis/quiz";
import questionApi from "apis/question";
import Button from "components/Button";

const CreateQuestion = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [question, setQuestion] = useState("");
  const [showOption3, setShowOption3] = useState(false);
  const [showOption4, setShowOption4] = useState(false);
  const [correctOption, setCorrectOption] = useState("1");

  useEffect(async () => {
    try {
      const {
        data: { quiz_question },
      } = await quizApi.show(id);
      setName(quiz_question.name);
    } catch (err) {
      logger.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateQuestion = async () => {
    const data = {
      question: {
        name: question,
        options_attributes: [
          { name: option1 },
          { name: option2 },
          { name: option3 },
          { name: option4 },
        ],
        correct_option: correctOption,
      },
      quiz_id: id,
    };
    try {
      const response = questionApi.create(data);
      history.push(`/quiz/${id}`);
    } catch (err) {
      logger.error(err);
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
    <div className="w-full p-8">
      <div className="text-2xl font-medium text-gray-700 px-8">{name}</div>
      {/* Question */}
      <div className="flex flex-row p-4">
        <label htmlFor="quiz-name" className="pt-2 text-xl text-gray-500 w-32">
          Question
        </label>
        <div className="flex flex-col pl-4 w-3/5">
          <div className="mb-3 pt-0">
            <input
              type="text"
              name="quiz-name"
              placeholder="Ex: Solar System Quiz"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              id="quiz-name"
              className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
      </div>
      {/* Option 1 */}
      <div className="flex flex-row px-4">
        <label htmlFor="option-1" className="pt-2 text-xl text-gray-500 w-32">
          Option 1
        </label>
        <div className="flex flex-col pl-4 w-2/5">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Ex: Earth"
              name="option-1"
              value={option1}
              onChange={(e) => {
                setOption1(e.target.value);
              }}
              id="option-1"
              className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
      </div>
      {/* Option 2 */}
      <div className="flex flex-row px-4">
        <label htmlFor="option-2" className="pt-2 text-xl text-gray-500 w-32">
          Option 2
        </label>
        <div className="flex flex-col pl-4 w-2/5">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Ex: Mars"
              name="option-2"
              value={option2}
              onChange={(e) => {
                setOption2(e.target.value);
              }}
              id="option-2"
              className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
      </div>
      {/* Option 3 */}
      {showOption3 && (
        <div className="flex flex-row px-4">
          <label htmlFor="option-3" className="pt-2 text-xl text-gray-500 w-32">
            Option 3
          </label>
          <div className="flex flex-col pl-4 w-2/5">
            <div className="mb-3 pt-0">
              <input
                type="text"
                name="option-3"
                value={option3}
                onChange={(e) => {
                  setOption3(e.target.value);
                }}
                id="option-3"
                className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
          </div>
          <button
            className="p-3 text-red-500 outline-none focus:outline-none"
            onClick={() => {
              setShowOption3(false);
            }}
          >
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Option 4 */}
      {showOption4 && (
        <div className="flex flex-row px-4">
          <label htmlFor="option-4" className="pt-2 text-xl text-gray-500 w-32">
            {showOption3 ? <div>Option 4</div> : <div>Option 3</div>}
          </label>
          <div className="flex flex-col pl-4 w-2/5">
            <div className="mb-3 pt-0">
              <input
                type="text"
                name="option-4"
                value={option4}
                onChange={(e) => {
                  setOption4(e.target.value);
                }}
                id="option-4"
                className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
          </div>
          <button
            className="p-3 text-red-500 outline-none focus:outline-none"
            onClick={() => {
              setShowOption4(false);
            }}
          >
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      )}
      <div className="p-2 w-40 ml-40 ">
        <button
          className="text-blue-700 outline-none focus:outline-none"
          onClick={() => {
            if (!showOption3) {
              setShowOption3(true);
            } else {
              setShowOption4(true);
            }
          }}
        >
          Add more options
        </button>
      </div>
      <div className="p-2 text-xl text-gray-500 w-32 ml-40 shadow ">
        <select
          className="outline-none"
          name="cars"
          id="cars"
          onChange={(e) => {
            setCorrectOption(e.target.value);
          }}
        >
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          {showOption3 && <option value="3">Option 3</option>}
          {showOption4 && <option value="4">Option 4</option>}
        </select>
      </div>
      <div className="w-48 mx-40 p-1">
        <Button
          buttonText="Create Question"
          onClick={handleCreateQuestion}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateQuestion;
