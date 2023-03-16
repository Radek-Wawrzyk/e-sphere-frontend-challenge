import axios from 'axios';

const httpInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  validateStatus: (status) => status >= 200 && status < 300,
});

export { httpInstance };
