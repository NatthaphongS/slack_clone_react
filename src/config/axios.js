import axios from 'axios';
import { getAccessToken } from '../utils/local-storage';

axios.defaults.baseURL = 'http://localhost:3000/';

axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message.status === 401) {
      removeAccessToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
