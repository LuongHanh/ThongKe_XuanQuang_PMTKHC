import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/login';

export const login = async (username, password) => {
  const res = await axios.post(API_URL, { username, password });
  return res.data;
};
