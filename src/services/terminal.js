import { client } from "./axios";

const signup = (body) => client.post(`/auth/signup`, body);
const login = (body) => client.post(`/auth/login`, body);
const refreshToken = (body) => client.post(`/auth/refresh`, body);
const fetchMe = () => client.get(`/auth/me`);
const requestEmailVerify = (body) =>
  client.post(`/auth/request-email-verify`, body);

const terminalService = {
  signup,
  login,
  refreshToken,
  fetchMe,
  requestEmailVerify,
};

export default terminalService;
