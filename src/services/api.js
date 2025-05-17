import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/customers';

export const getCustomers = (page = 0, size = 10) => 
  axios.get(`${API_BASE_URL}?page=${page}&size=${size}`);

export const createCustomer = customer => 
  axios.post(API_BASE_URL, customer);

export const uploadCustomersExcel = file => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
