import axios from "axios";
import { getLocalUserData } from ".";
import { getRefreshToken } from "master";
import { setCookie, removeCookie } from "utils";

const sessionTimeOutEvent = () => {
  removeCookie("_user_data");
  window.location.href = "/";
};

let requestsQueue = [];
let isRefreshing = false;

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "api/",
  headers: {
    "Content-Type": "application/json",
    source: "App",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const localUser = getLocalUserData();

    if (localUser?.accessToken) {
      config.headers["Authorization"] = "Bearer " + localUser.accessToken;
      config.headers["Current-Role"] = localUser.currentRole?.roleId;
    } else {
      config.headers["Authorization"] = null;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const accessToken = await refreshToken();
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          await retryQueuedRequests();
          return await Axios(originalRequest);
        } catch (error) {
          sessionTimeOutEvent();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        requestsQueue.push({
          resolve,
          reject,
          originalRequest,
        });
      });
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const localUser = getLocalUserData();

    if (!localUser || !localUser.refreshToken || !localUser.accessToken) {
      sessionTimeOutEvent();
    }

    const tokenPayload = {
      accessToken: localUser.accessToken,
      refreshToken: localUser.refreshToken,
    };

    const response = await getRefreshToken(tokenPayload);

    if (!response || !response.accessToken || !response.refreshToken) {
      sessionTimeOutEvent();
    }
    console.log(response);
    const updatedData = {
      ...localUser,
      refreshToken: response?.refreshToken,
      accessToken: response?.accessToken,
    };

    setCookie("_user_data", JSON.stringify(updatedData));

    return response.accessToken;
  } catch (error) {
    sessionTimeOutEvent();
    throw error;
  }
};

const retryQueuedRequests = async () => {
  const pendingRequests = [...requestsQueue];
  requestsQueue = [];

  pendingRequests.forEach(({ originalRequest: config, resolve, reject }) => {
    Axios.request(config)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};
