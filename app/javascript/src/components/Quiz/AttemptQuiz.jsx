/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import attemptApi from "apis/attempt";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import { useHistory } from "react-router-dom";

const AttemptQuiz = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [quizName, setQuizName] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(async () => {
    history.location.state = undefined;
    try {
      const {
        data: { quiz_question },
      } = await attemptApi.show(match.params.id);
      setQuizName(quiz_question.name);
    } catch (e) {
      logger.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateAttempt = async () => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      email: email,
    };
    try {
      const { data, state } = await attemptApi.createAttempt({
        user,
        id: match.params.id,
      });
      // replace will remove extra / from url
      history.push(
        (match.url + "/play").replace(/([^:]\/)\/+/g, "$1"),
        data.attempt
      );
    } catch (e) {
      logger.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="p-8">
      <div className="text-2xl font-medium text-indigo-500">
        Welcome to {quizName}
      </div>
      <div className="p-4">
        <div className="flex flex-row">
          <label
            htmlFor="quiz-name"
            className="pt-2 text-xl text-gray-500 w-1/6"
          >
            First Name
          </label>
          <div className="flex flex-col pl-4 w-1/5">
            <div className="mb-3 pt-0">
              <input
                type="text"
                name="name"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                id="quiz-name"
                className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <label
            htmlFor="quiz-name"
            className="pt-2 text-xl text-gray-500 w-1/6"
          >
            Last Name
          </label>
          <div className="flex flex-col pl-4 w-1/5">
            <div className="mb-3 pt-0">
              <input
                type="text"
                name="quiz-name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                id="quiz-name"
                className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <label
            htmlFor="quiz-name"
            className="pt-2 text-xl text-gray-500 w-1/6"
          >
            Email
          </label>
          <div className="flex flex-col pl-4 w-2/5">
            <div className="mb-3 pt-0">
              <input
                type="text"
                name="quiz-name"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="quiz-name"
                className="h-12 px-3 placeholder-bluegray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div
            htmlFor="quiz-name"
            className="pt-2 text-xl text-gray-500 w-1/6"
          ></div>
          <div className="flex flex-col pl-4 w-2/5">
            <div className="w-24">
              <Button
                buttonText="Next"
                onClick={handleCreateAttempt}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttemptQuiz;
