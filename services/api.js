import axios from 'axios';

const API_URL = 'https://api.chucknorris.io/jokes/random';

export const fetchItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
