import axios from "axios";
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL;

console.log(Constants.expoConfig?.extra?.API_URL)
const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 10000,
});

export default axiosInstance;