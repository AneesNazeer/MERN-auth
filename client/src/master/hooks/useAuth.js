import React from "react";
import { useMutation } from "@tanstack/react-query";
import {
  authenticate,
  logout,
  logoutFromAll,
  registerUser,
  useAppScope,
} from "..";
import {
  clearHistoryAndRedirect,
  errorFormatter,
  errorMessage,
  removeCookie,
  setCookie,
  successMessage,
} from "utils";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useImmer({
    name: "",
    email: "",
    password: "",
  });

  const { setAppState } = useAppScope();

  const loginMutation = useMutation({
    mutationFn: authenticate,
    onSuccess: (data) => {
      if (data.accessToken) {
        setAppState((draft) => data);
        const { refreshToken, accessToken, user } = data;
        const userData = {
          refreshToken,
          accessToken,
          user: user,
        };
        setCookie("_user_data", JSON.stringify(userData));
        navigate("/", { replace: true });
      }
    },
    onError: (e) => {
      errorFormatter(e);
    },
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      successMessage();
    },
    onError: () => {
      errorMessage();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearHistoryAndRedirect("/login");
      removeCookie("_user_data");
      successMessage("Logout successfully");
    },
    onError: () => {
      errorMessage();
    },
  });

  const logoutFromAllMutation = useMutation({
    mutationFn: logoutFromAll,
    onSuccess: () => {
      clearHistoryAndRedirect("/login");
      removeCookie("_user_data");
      successMessage("Logout successfully");
    },
    onError: () => {
      errorMessage();
    },
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((draft) => {
      draft[name] = value;
      return draft;
    });
  };

  const logoutFn = () => {
    logoutMutation.mutate();
  };

  const logoutFromAllFn = () => {
    logoutFromAllMutation.mutate();
  };

  return {
    user,
    loginMutation,
    registerMutation,
    onChange,
    logoutFn,
    logoutFromAllFn,
  };
};
