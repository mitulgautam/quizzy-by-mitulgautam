import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import quizApi from "apis/quiz";
import PageLoader from "components/PageLoader";
import Button from "components/Button";

const ShowQuiz = ({ match }) => {
  const id = match.params.id;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    try {
      const {
        data: { quiz },
      } = await quizApi.show(id);
      setName(quiz.name);
      setQuestions(quiz.questions);
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
      <div className="w-36 ml-auto mr-8">
        <Button
          type="button"
          buttonText="Add new question"
          onClick={null}
          loading={false}
        />
      </div>
      <div className="text-2xl font-medium text-gray-700 px-8">{name}</div>
      {questions.length === 0 ? (
        <div className="mx-auto my-64 text-gray-500">
          There are no quiz in this solar system.
        </div>
      ) : (
        <div>Update show question code here</div>
      )}
    </div>
  );
};

export default ShowQuiz;
