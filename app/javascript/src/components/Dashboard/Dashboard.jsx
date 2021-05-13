/* eslint-disable arrow-parens */
import React from "react";
import Button from "components/Button";

function Dashboard() {
  const _handleSubmitButton = (e) => {};
  return (
    <div className="flex flex-col">
      <div className="w-32 ml-auto mr-8">
        <Button
          type="button"
          buttonText="Add new quiz"
          onClick={null}
          loading={false}
        />
      </div>
      <div className="mx-auto mt-64 text-xl text-gray-700">
        You have not created any quiz.
      </div>
    </div>
  );
}

export default Dashboard;
