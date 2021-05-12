import React from "react";
import NavBar from "components/NavBar/index";
import LoginForm from "components/Login/LoginForm";
const Login = () => {
  return (
    <div>
      <section>
        <NavBar />
      </section>
      <section>
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
