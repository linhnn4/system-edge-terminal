import { client } from "./axios";

const signup = (body) => client.post(`/auth/signup`, body);
const login = (body) => client.post(`/auth/login`, body);
const refreshToken = (body) => client.post(`/auth/refresh`, body);
const fetchMe = () => client.get(`/auth/me`);
const requestEmailVerify = (body) =>
  client.post(`/auth/request-email-verify`, body);
const verifyEmail = (params, config) =>
  client.get(`/auth/verify-email`, { params, ...config });
const forgotPassword = (body) =>
  client.post(`/auth/request-password-reset`, body);
const resetPassword = (body) => client.post(`/auth/reset-password`, body);

const terminalService = {
  signup,
  login,
  refreshToken,
  fetchMe,
  requestEmailVerify,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

export default terminalService;
