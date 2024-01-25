import React, { Component } from 'react';
import css from './app.module.css';
import CustomButton from './CustomButton/CustomButton';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';
import { searchImages } from '../api/posts';

import SearchForm from '../components/SearchForm/SearchForm';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    itemDetails: {},
  };

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      this.setState({
        loading: true,
      });
      try {
        const { data } = await searchImages(search, page);
        this.setState(({ items }) => ({
          items: data?.length ? [...items, ...data] : items,
        }));
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

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
        <>
          <SearchForm onSubmit={handleSearch} />
          {error && <p>помилка завантаження</p>}
          {loading && <p>...Loading</p>}
          {isItems && <ImageGallery showModal={showModal} items={items} />}
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
        </>
      </div>
    );
  }
}

export default App;
