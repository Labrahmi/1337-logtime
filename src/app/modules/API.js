// API.js

import axios from 'axios';

export const fetchDataFromAPI = async (user) => {
  try {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT, {
      login: user.login,
      startDate: user.startDate,
      endDate: user.endDate,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
