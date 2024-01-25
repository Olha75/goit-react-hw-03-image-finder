import React from 'react';
import css from './imageGallery.module.css';

const ImageGallery = ({ showModal, items }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li key={id} onClick={() => showModal({ id, webformatURL, largeImageURL })}>
      <img src={webformatURL} alt={`Image ${id}`} />
      <img src={largeImageURL} alt={`Large Image ${id}`} />
    </li>
  ));

  return <ul className={css.gallery}>{elements}</ul>;
};

export default ImageGallery;

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
