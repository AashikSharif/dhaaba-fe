import axios from 'axios';
import * as Device from 'expo-device';

// Localhost IP for the computer
const LOCAL_IP = '192.168.254.56'; // Change this to your actual local IP

// Set base URL
const BASE_URL = Device.isDevice ? `http://${LOCAL_IP}:3000` : `http://localhost:3000`;

// Debug log
console.log(
  `Running on ${Device.isDevice ? 'Physical Device' : 'Simulator'} - Base URL: ${BASE_URL}`
);

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  // timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
