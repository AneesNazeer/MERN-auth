import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "..";

export const Login = () => {
  const { user, loginMutation, onChange } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(user);
  };

  return (
    <div className="wrapper signIn">
      <div className="form">
        <div className="heading">LOGIN</div>
        <form>
          <div>
            <label htmlFor="e-mail">E-Mail</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter you mail"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={onChange}
            />
          </div>
          <button type="submit" onClick={onSubmit}>
            Submit
          </button>
        </form>
        <p>
          Don't have an account ? <Link to="/signup"> Sign In </Link>
        </p>
      </div>
    </div>
  );
};
