import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getDonations = () => API.get('/donations');
export const addDonation = (data) => API.post('/donations', data);
export const getRequests = () => API.get('/requests');
export const addRequest = (data) => API.post('/requests', data);
export const getMatches = () => API.get('/matches');