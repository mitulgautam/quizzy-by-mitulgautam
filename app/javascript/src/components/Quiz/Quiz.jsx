/* eslint-disable arrow-parens */
import React, { useEffect, useState } from "react";
import attemptApi from "apis/attempt";
import PageLoader from "components/PageLoader";
import Button from "components/Button";
import { useHistory } from "react-router-dom";

const Quiz = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [name, setName] = useState("");
  const [attempAnswers, setAttempAnswers] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const id = history.location.state.id;

  useEffect(async () => {
    logger.info(history.location.state);
    if (history.location.state === undefined)
      history.push("/" + history.location.pathname.slice(1, -4));
    else {
      try {
        const {
          data: { quiz_question },
        } = await attemptApi.show(match.params.id);
        setName(quiz_question.name);
        setQuestions(quiz_question.questions);
        quiz_question.questions.map((question) =>
          setAttempAnswers(
            attempAnswer.push({ question_id: question.id, option_id: null })
          )
        );
      } catch (e) {
        logger.error(e);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleSaveAttempt = async () => {
    try {
      setButtonLoading(true);
      const { data, status } = await attemptApi.update(id, {
        attempt: { attempt_answers_attributes: attempAnswers },
      });

      // replace will remove extra / from url
      if (status === 200)
        history.push(
          ("/" + history.location.pathname.slice(1, -4) + "result").replace(
            /([^:]\/)\/+/g,
            "$1"
          ),
          id
        );
    } catch (e) {
      logger.error(e);
    } finally {
      setButtonLoading(false);
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
    <div className="p-4">
      <div className="text-2xl font-medium text-gray-700">{name}</div>
      {questions.length === 0 ? (
        <div className="mx-auto my-64 text-gray-500">
          There are no quiz in this solar system.
        </div>
      ) : (
        <div className="p-2">
          {questions.map((question, i) => (
            <div key={question.id} className="p-2">
              <div className="flex flex-row">
                <div className="text-lg font-bold w-4/5">
                  {"Question " + (i + 1) + ". " + question.name}
                </div>
              </div>
              <div>
                {question.options.map((option, i) => (
                  <div key={option.id} className="flex flex-row ml-8 mt-2">
                    <div className="w-20 text-gray-500"></div>
                    <div className="p-1">
                      <input
                        type="radio"
                        className={option.name}
                        name={question.id}
                        value={option.id}
                        onChange={(e) => {
                          // eslint-disable-next-line no-console
                          console.log(e.target.value);
                          const answer = {
                            question_id: question.id,
                            option_id: e.target.value,
                          };

                          const attempAnswersDup = attempAnswers.filter(
                            (attempAnswer) =>
                              attempAnswer.question_id !== question.id
                          );
                          attempAnswersDup.push(answer);
                          setAttempAnswers(attempAnswersDup);
                        }}
                      ></input>
                    </div>
                    <div className="p-1">{option.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-row">
        <div
          htmlFor="quiz-name"
          className="pt-2 text-xl text-gray-500 w-1/6"
        ></div>
        <div className="flex flex-col pl-4 w-2/5">
          <div className="w-24">
            <Button
              buttonText="Submit"
              onClick={handleSaveAttempt}
              loading={buttonLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
