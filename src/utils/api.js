import axios from 'axios';
import * as Device from 'expo-device';

const LOCAL_IP = '10.109.126.3';

const BASE_URL = Device.isDevice ? `http://${LOCAL_IP}:3000` : `http://localhost:3000`;

console.log(
  `Running on ${Device.isDevice ? 'Physical Device' : 'Simulator'} - Base URL: ${BASE_URL}`
);

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
