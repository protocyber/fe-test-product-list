const BASE_URL = 'https://dummyjson.com/products';

export const DEFAULT_LIMIT = 30;

export type ProductRequestParams = {
  limit?: number;
  skip?: number;
  query?: string;
};

export const getProducts = async ({limit = DEFAULT_LIMIT, skip}: ProductRequestParams) => {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  const data = await response.json();
    return data;
};

export const getProductById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  const data = await response.json();
    return data;
};

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/category-list`);
  const data = await response.json();
    return data;
};

export const getProductsByCategory = async (category: string, {limit = DEFAULT_LIMIT, skip}: ProductRequestParams) => {
  const response = await fetch(
    `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`,
  );
  const data = await response.json();
    return data;
};

export const searchProducts = async ({query, limit = DEFAULT_LIMIT, skip}: ProductRequestParams) => {
    const url = `${BASE_URL}/search?q=${query}&limit=${limit}&skip=${skip}`;
    console.log('searching products: ', query, '. url: ', url)
    const response = await fetch(url);
    const data = await response.json();
    return data;
};
