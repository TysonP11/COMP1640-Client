import axios from 'axios';

let BASE_URL;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8091';
}

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
