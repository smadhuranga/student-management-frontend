import axios from 'axios';


// Create an Axios instance with the base URL of your backend API
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;