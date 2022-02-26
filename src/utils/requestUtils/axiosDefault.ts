import axios from "axios";

const token = localStorage.getItem('token')

axios.defaults.baseURL = 'http://localhost/api/v1/';
token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

export default axios;