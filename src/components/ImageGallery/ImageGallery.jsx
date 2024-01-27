import React from 'react';
import css from './imageGallery.module.css';

import PropTypes from 'prop-types';

const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ImageGallery;
// const ImageGallery = ({ showModal, items }) => {
//   const elements = items.map(({ id, webformatURL, largeImageURL }) => (
//     <li key={id} onClick={() => showModal({ id, webformatURL, largeImageURL })}>
//       <img src={webformatURL} alt="" />
//       <img src={largeImageURL} alt="" />
//     </li>
//   ));

//   return <ul className={css.gallery}>{elements}</ul>;
// };

// import css from './imageGallery.module.css';

// const ImageGallery = ({ items }) => {
//   const elements = posts.map(({ id, webformatURL, largeImageUR }) => (
//     <li key={id}>
//       {webformatURL}
//       {largeImageUR}
//     </li>
//   ));

//   return <ul class="gallery">{elements}</ul>;
// };

// export default ImageGallery;
