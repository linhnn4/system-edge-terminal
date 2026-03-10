import { client } from "./axios";

const signup = (body) => client.post(`/auth/signup`, body);
const login = (body) => client.post(`/auth/login`, body);
const fetchMe = () => client.get(`/auth/me`);

const terminalService = {
  signup,
  login,
  fetchMe,
};

export default terminalService;
