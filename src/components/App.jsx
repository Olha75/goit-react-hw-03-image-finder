import React, { Component } from 'react';
import CustomButton from './CustomButton/CustomButton';
import Modal from './Modal/Modal';
import SearchForm from '../components/SearchForm/SearchForm';
import SearchBar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import { searchImages } from '../api/posts';
import css from './app.module.css';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    itemDetails: {},
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (search && (search !== prevState.search || page !== prevState.page)) {
      await this.getApi(search, page);
    }
  }

  async getApi() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchImages(search, page);
      if (data.hits && data.hits.length > 0) {
        this.setState(({ items }) => ({
          items: [...items, ...data.hits],
          // items: data.hits?.length ? [...items, ...data.hits] : items,
          // totalHits: data.totalHits,
        }));
      } else {
        alert('Вибачте, сталася помилка, спробуйте ще.');
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    this.setState({ search, items: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      itemDetails: {
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
    const { items, loading, error, modalOpen, itemDetails, totalHits } =
      this.state;
    const isItems = Boolean(items.length);

    // console.log('App - items:', items);

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchForm onSubmit={handleSearch} />
        {error && <p className={css.error}>помилка завантаження</p>}
        {loading && <Loader />}
        {/* <SearchBar searchImages={searchImages} /> */}
        {isItems && <ImageGallery items={items} showModal={showModal} />}
        {isItems && items.length < totalHits ? (
          <CustomButton onClick={loadMore} type="button">
            Load more
          </CustomButton>
        ) : null}
        {modalOpen && (
          <Modal largeImageURL={itemDetails.largeImageURL} close={closeModal} />

          // <Modal close={this.closeModal}>
          //   <img src={itemDetails.largeImageURL} alt="" />
          // </Modal>
        )}
      </div>
    );
  }
}

export default App;
