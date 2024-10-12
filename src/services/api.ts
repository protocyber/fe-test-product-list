import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const DEFAULT_LIMIT = 30;

export type ProductRequestParams = {
  limit: number;
  skip: number;
};

export const getProducts = async ({limit = DEFAULT_LIMIT, skip}: ProductRequestParams) => {
  const response = await axios.get(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/category-list`);
  return response.data;
};

export const getProductsByCategory = async (category: string, {limit = DEFAULT_LIMIT, skip}: ProductRequestParams) => {
  const response = await axios.get(
    `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`,
  );
  return response.data;
};
