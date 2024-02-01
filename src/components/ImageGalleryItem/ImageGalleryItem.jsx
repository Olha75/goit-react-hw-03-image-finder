import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, showModal }) => {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => {
        showModal(largeImageURL);
      }}
      // className={css.galleryItem}
    >
      <img className={css.imageGalleryItem_image} src={webformatURL} alt="" />
    </li>
  );
};

export default ImageGalleryItem;
