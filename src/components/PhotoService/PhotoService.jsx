import axios from 'axios';

const ACCESS_KEY = 'Qxo0e0ObNkg2RBE4Ayhxv5Hj-9RNecUVtD_3gKKMZxI';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const PhotoService = async (query, page) => {
  const { data } = await axios.get(`/search/photos`, {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: '20',
    },
  });
  return data;
};
