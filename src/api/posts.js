import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
});

const apiKey = '35827866-cac2bfdbcf92b350627521ced';

export const getAllPosts = () => {
  const params = {
    key: apiKey,
  };

  return instance.get('/', { params });
};

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
