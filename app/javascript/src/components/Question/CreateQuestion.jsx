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
  const [options, setOptions] = useState([
    { id: "first", name: "" },
    { id: "second", name: "" },
  ]);
  const [question, setQuestion] = useState("");
  const [correctOption, setCorrectOption] = useState("");

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
        options_attributes: options,
        correct_option: correctOption,
      },
      quiz_id: id,
    };

    try {
      const response = await questionApi.create(data);
      if (response.status === 200) history.push(`/quiz/${id}`);
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
      {options.map((option, i) => (
        <div key={i} className="flex flex-row px-4">
          <label htmlFor="option-3" className="pt-2 text-xl text-gray-500 w-32">
            <div>{"Option" + " " + (i + 1)}</div>
          </label>
          <div className="flex flex-col pl-4 w-2/5">
            <div className="mb-3 pt-0">
              <input
                type="text"
                name={"option-" + option.id.toString()}
                value={option.name}
                onChange={(e) => {
                  const optionsDup = [...options];
                  const optionDup = optionsDup.filter(
                    (o) => o.id === option.id
                  )[0];
                  optionDup.name = e.target.value;
                  setOptions(optionsDup);
                }}
                id={"option-" + option.id.toString()}
                className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
          </div>
          {options.length > 2 && (
            <button
              className="p-3 text-red-500 outline-none focus:outline-none"
              onClick={() => {
                setOptions(options.filter((e) => e.id !== option.id));
                if (correctOption.toString() === (i + 1).toString())
                  setCorrectOption("");
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
          )}
        </div>
      ))}
      <div className="p-2 w-40 ml-40 ">
        <button
          className="text-blue-700 outline-none focus:outline-none"
          onClick={() => {
            if (options.length < 4)
              setOptions([
                ...options,
                {
                  id: Math.random().toString(36).substring(7),
                  name: "",
                  state: "new",
                },
              ]);
          }}
        >
          Add more options
        </button>
      </div>
      <div className="p-2 text-xl text-gray-500 w-40 ml-40 shadow ">
        <select
          className="outline-none"
          name="cars"
          id="cars"
          value={correctOption}
          onChange={(e) => {
            setCorrectOption(e.target.value);
          }}
        >
          <option key="select-option" value="">
            Select Answer
          </option>
          {options.map((option, i) => (
            <option key={i} value={i + 1}>
              {"Option" + " " + (i + 1).toString()}
            </option>
          ))}
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
