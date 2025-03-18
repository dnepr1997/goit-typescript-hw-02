import axios from 'axios';
import { PhotoServiceResponse } from '../types/types';

const ACCESS_KEY = 'Qxo0e0ObNkg2RBE4Ayhxv5Hj-9RNecUVtD_3gKKMZxI';
axios.defaults.baseURL = 'https://api.unsplash.com/';

export const PhotoService = async (query: string, page: number): Promise<PhotoServiceResponse> => {
  const response = await axios.get<PhotoServiceResponse>('/search/photos', {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: 20, // виправив на число
    },
  });
  return response.data;
};
