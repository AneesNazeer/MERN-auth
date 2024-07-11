import React from "react";
import { Navigate } from "react-router-dom";
import { useAppScope } from "..";

export const PublicRoute = ({ children, redirectTo }) => {
  const {
    AppState: { accessToken },
  } = useAppScope();

  return accessToken ? <Navigate to={redirectTo} /> : children;
};
