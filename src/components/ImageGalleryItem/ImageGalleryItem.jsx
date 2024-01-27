// import css from './ImageGalleryItem.module.css';

import React from 'react';

const ImageGalleryItem = ({ showModal, item }) => {
  const { id, webformatURL, largeImageURL } = item;

  return (
    <li key={id} onClick={() => showModal({ webformatURL, largeImageURL })}>
      <img src={webformatURL} alt={`${id}`} />
      <img src={largeImageURL} alt={`${id}`} />
    </li>
  );
};

export default ImageGalleryItem;

//   <li class="gallery-item">
//     <img src="" alt="" />
//   </li>;
// }
