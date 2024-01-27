import React, { Component } from 'react';
// import css from './app.module.css';
import CustomButton from './CustomButton/CustomButton';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import SearchForm from '../components/SearchForm/SearchForm';
import { Loader } from './Loader/Loader';
import { nanoid } from 'nanoid';
import { searchImages } from '../api/posts';

class App extends Component {
  state = {
    query: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    itemDetails: {},
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query && (query !== prevState.query || page !== prevState.page)) {
      this.getApi(query, page);
    }
  }

  getApi = async (query, page) => {
    if (query === '') return;
    this.setState({ loading: true });
    try {
      const { hits, totalHits } = await searchImages(query, page); // Оновлено виклик функції
      console.log('API response - hits:', hits);
      console.log('API response - totalHits:', totalHits);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = ({ id, webformatURL, largeImageURL }) => {
    this.setState({
      modalOpen: true,
      itemDetails: {
        id,
        webformatURL,
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      itemDetails: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { items, loading, error, modalOpen, itemDetails } = this.state;
    const isItems = Boolean(items.length);

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchForm onSubmit={handleSearch} />
        {error && <p>помилка завантаження</p>}
        {loading && <Loader />}
        {isItems && (
          <ImageGallery showModal={showModal}>
            {items.map(item => (
              <ImageGalleryItem
                key={nanoid()}
                item={item}
                onClick={this.onImageClick}
              />
            ))}
          </ImageGallery>
        )}
        {isItems && (
          <div>
            <CustomButton onClick={loadMore} type="button">
              Load more
            </CustomButton>
          </div>
        )}
        {modalOpen && (
          <Modal close={closeModal}>
            <img
              src={itemDetails.webformatURL}
              alt={`Image ${itemDetails.id}`}
            />
            <img
              src={itemDetails.largeImageURL}
              alt={`Large Image ${itemDetails.id}`}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

// async componentDidMount() {
//   this.setState({ loading: true });

//   try {
//     const { data } = await getAllPosts();
//     this.setState({
//       items: data?.length ? data : [],
//     });
//   } catch (error) {
//     this.setState({
//       error: error.message,
//     });
//   } finally {
//     this.setState({
//       loading: false,
//     });
//   }
// }
