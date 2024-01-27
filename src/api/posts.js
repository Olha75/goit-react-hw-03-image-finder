import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '35827866-cac2bfdbcf92b350627521ced',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = (q, _page = 1) => {
  return instance.get('/', {
    params: {
      q,
      _limit: 12,
      _page,
    },
  });
};

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '35827866-cac2bfdbcf92b350627521ced';

// export const searchImages = (q, page = 1) => {
//   return instance.get('/', {
//     params: {
//       key: '35827866-cac2bfdbcf92b350627521ced',
//       image_type: 'photo',
//       orientation: 'horizontal',
//       q,
//       per_page: 12,
//       page,
//     },
//   });
// };

// const instance = axios.create({
//   baseURL: 'https://pixabay.com/api',
//   params: {
//     key: '35827866-cac2bfdbcf92b350627521ced',
//     image_type: 'photo',
//     orientation: 'horizontal',
//   },
// });

// export const searchImages = (q, _page = 1) => {
//   return instance.get('/', {
//     params: {
//       q,
//       _limit: 12,
//       _page,
//     },
//   });
// };

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

// const apiKey = '35827866-cac2bfdbcf92b350627521ced';

// export const getAllPosts = () => {
//   const params = {
//     key: apiKey,
//   };

//   return instance.get('/', { params });
// };

// const instance = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com/posts',
// });

// export const getAllPosts = () => {
//   return instance.get('/');
// };
