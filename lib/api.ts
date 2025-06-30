import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:10062',
  headers: {
    Authorization: `Basic ${btoa('AEML:Adapter')}`
  }
});
export default api;