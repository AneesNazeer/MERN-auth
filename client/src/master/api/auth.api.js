import { Axios } from "utils";

export const authenticate = async (auth) => {
  const res = await Axios.post("auth/login", auth);
  return res.data;
};

export const registerUser = async (auth) => {
  const res = await Axios.post("auth/register", auth);
  return res.data;
};

export const getRefreshToken = async (auth) => {
  const res = await Axios.post("auth/refresh-token", auth);
  return res.data;
};

export const logout = async () => {
  const res = await Axios.post("auth/logout");
  return res.data;
};

export const logoutFromAll = async () => {
  const res = await Axios.post("auth/logoutAll");
  return res.data;
};
