import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// AUTH
export const registerUser = (data) =>
  API.post('/auth/register', data);

export const loginUser = (data) =>
  API.post('/auth/login', data);

// DONATIONS
export const getDonations = () =>
  API.get('/donations');

export const addDonation = (data) =>
  API.post('/donations/add-donation', data);

// VICTIMS
export const registerVictim = (data) =>
  API.post('/auth/victim', data);

export const getVictims = () =>
  API.get('/auth/victims');

// REQUESTS
export const getRequests = () =>
  API.get('/requests');

export const addRequest = (data) =>
  API.post('/requests', data);

// MATCHES
export const getMatches = () =>
  API.get('/matches');

export const createMatch = (data) =>
  API.post('/matches', data);

export const updateMatchStatus = (id, data) =>
  API.put(`/matches/${id}`, data);
// ANALYTICS
export const getAnalytics = () =>
  API.get('/auth/analytics');