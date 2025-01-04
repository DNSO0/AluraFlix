import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Base URL del json-server
});

export default api;
