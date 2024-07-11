import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "..";

export const Signup = () => {
  const { user, registerMutation, onChange } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(user);
  };
  return (
    <div className="wrapper signUp">
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
          Have an account ? <Link to="/login"> Login </Link>
        </p>
      </div>
    </div>
  );
};
