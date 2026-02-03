import { client } from './axios';

const login = (body) => client.post(`/authentication/token`, body);
const fetchMe = () => client.get(`/user/info`);

const terminalService = {
  login,
  fetchMe,
};

export default terminalService;
