import useUser from "@/reducers/user";
import notificationService from "@/services/notificationService";
import axios from "axios";
import qs from "qs";

import { API_URL } from "@/utils/constants";
import terminalService from "./terminal";

const DEFAULT_ERROR = "Something went wrong. Please try again!";

let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (callback) => {
  subscribers.push(callback);
};

const onTokenRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const refreshAuthToken = async () => {
  try {
    const { refreshToken } = useUser.getState().user;
    if (refreshToken) {
      const result = await terminalService.refreshToken({
        refresh_token: refreshToken,
      });
      useUser.getState().updateUser({
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
      });
      return result.access_token;
    }
  } catch (error) {
    console.log({ error });
  }
  return null;
};

const onError = (error) => {
  const { response, config } = error || {};
  const ignore = config?.ignoreError === true;

  if (!ignore) {
    if (response) {
      const { code, status, data } = response;
      const errorCode = status || code;
      if (errorCode === 401) {
        notificationService.error({
          title: `${errorCode} - ${data?.message || DEFAULT_ERROR}`,
        });
        useUser.getState().logout();
      } else if (errorCode < 500) {
        notificationService.error({
          title: `${errorCode} - ${data?.message || DEFAULT_ERROR}`,
        });
      } else {
        notificationService.error({
          title: `${errorCode} - ${data?.message || DEFAULT_ERROR}`,
        });
      }
    } else {
      notificationService.error({
        title: "Cannot connect to Server",
      });
    }
  }

  return Promise.reject(response);
};

const beforeRequest = (config) => {
  const { accessToken } = useUser.getState().user;
  if (accessToken) {
    Object.assign(config.headers, { Authorization: `Bearer ${accessToken}` });
  }
  if (config.data instanceof FormData) {
    Object.assign(config.headers, { "Content-Type": "multipart/form-data" });
  }
  return config;
};

const client = /** @type {any} */ (
  axios.create({
    baseURL: API_URL,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  })
);

client.interceptors.request.use(beforeRequest);

client.interceptors.response.use(
  ({ data: response }) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
    console.log({ error, isRefreshEndpoint });
    if (
      (error?.status === 401 || error?.status === 403) &&
      !originalRequest._retry &&
      !isRefreshEndpoint &&
      !originalRequest._skipRefresh
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(client(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAuthToken();

        if (newToken) {
          isRefreshing = false;
          onTokenRefreshed(newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        } else {
          isRefreshing = false;
          subscribers = [];
          useUser.getState().logout();
          return onError(error);
        }
      } catch (refreshError) {
        isRefreshing = false;
        subscribers = [];
        useUser.getState().logout();
        return onError(refreshError);
      }
    }

    if (!isRefreshEndpoint) {
      return onError(error);
    }

    return Promise.reject(error);
  },
);

export { client };
