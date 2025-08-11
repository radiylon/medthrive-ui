import axios from 'axios';
import { config } from '../../config';

const api = axios.create({
  baseURL: config.urls.api,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
