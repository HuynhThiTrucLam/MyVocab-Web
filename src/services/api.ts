import axios from "axios";
const BASE_URL = "your-api-url";

export const api = {
  get: async (endpoint: string) => {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  },
  post: async (endpoint: string, data: any) => {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);
    return response.data;
  },
  put: async (endpoint: string, data: any) => {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data);
    return response.data;
  },
  delete: async (endpoint: string) => {
    const response = await axios.delete(`${BASE_URL}${endpoint}`);
    return response.data;
  },
};
