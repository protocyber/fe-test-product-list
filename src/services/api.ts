import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data.products;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/category-list`);
  return response.data;
};

export const getProductsByCategory = async (category: string) => {
  const response = await axios.get(`${BASE_URL}/category/${category}`);
  return response.data.products;
};
