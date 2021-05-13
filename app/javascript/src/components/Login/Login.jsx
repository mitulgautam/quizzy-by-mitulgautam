/* eslint-disable arrow-parens */
import React, { useState } from "react";
import Button from "components/Button";
import authenticationApi from "apis/authentication";
import Toastr from "components/Common/Toastr";
import { useAuthDispatch } from "contexts/auth";
import { Redirect } from "react-router";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authDispatch = useAuthDispatch();

  const _handleSubmitButton = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      Toastr.error("Email and Password is blank.");
    } else if (email === "") {
      Toastr.error("Email is blank");
    } else if (password === "") {
      Toastr.error("Password is blank");
    } else {
      try {
        setIsLoading(true);
        const {
          data: { user },
        } = await authenticationApi.login({
          email,
          password,
        });
        authDispatch({
          type: "LOGIN",
          payload: { email, role: user["email"] },
        });
        history.push("/");
      } catch (err) {
        logger.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-32 rounded-lg shadow-2xl">
      <section>
        <h3 className="font-bold text-2xl text-gray-600 p-4">Login</h3>
      </section>
      <section className="mt-10">
        <form className="flex flex-col" onSubmit={_handleSubmitButton}>
          <div className="mb-6 pt-3 rounded bg-gray-200">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            >
              Email
            </label>
            <input
              value={email}
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <div className="mb-6 pt-3 rounded bg-gray-200">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2 ml-3"
            >
              Password
            </label>
            <input
              value={password}
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
            />
          </div>
          <Button
            type="submit"
            buttonText="Submit"
            loading={isLoading}
            onClick={_handleSubmitButton}
          />
        </form>
      </section>
    </main>
  );
};

export default Login;
