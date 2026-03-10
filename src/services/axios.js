import useUser from "@/reducers/user";
import notificationService from "@/services/notificationService";
import axios from "axios";
import qs from "qs";

import { API_URL } from "@/utils/constants";

const DEFAULT_ERROR = "Something went wrong. Please try again!";

const onError = ({ response }) => {
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

const client = axios.create({
  baseURL: API_URL,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});
client.interceptors.request.use(beforeRequest);

[client].forEach((client) => {
  client.interceptors.response.use(({ data: response }) => {
    return response;
  }, onError);
});

export { client };
