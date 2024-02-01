import React, { Component } from 'react';
import css from './searchBar.module.css';
import { searchImages } from 'api/posts';
import SearchForm from 'components/SearchForm/SearchForm';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
// import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
// import css from '../ImageGallery/imageGallery.module.css';

class SearchBar extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const { data } = await searchImages('');
      this.setState({
        items: data.hits?.length ? data.hits : [],
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { items, loading, error } = this.state;
    const elements = items.map(({ id, webformatURL, largeImageURL }) => (
      <li key={id} className={css.imageGalleryItem}>
        <img className={css.imageGalleryItem_image} src={webformatURL} alt="" />
      </li>
    ));

    return (
      <>
        <SearchForm />
        {error && <p className={css.error}>{error}</p>}
        {loading && <Loader />}
        {Boolean(elements.length) && (
          <ImageGallery className={css.imageGallery}>{elements}</ImageGallery>
        )}
      </>
    );
  }
}

export default SearchBar;
