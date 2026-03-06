import { client } from "./axios";

const signup = (body) => client.post(`/auth/signup`, body);

const terminalService = {
  signup,
};

export default terminalService;
