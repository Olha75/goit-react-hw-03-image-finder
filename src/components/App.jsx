import React, { Component } from 'react';
import css from './app.module.css';
import CustomButton from './CustomButton/CustomButton';

import ImageGallery from './ImageGallery/ImageGallery';
import getAllPosts, { searchImages } from '../api/posts';

import SearchForm from '../components/SearchForm/SearchForm';

class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search && search !== prevState.search) {
      this.setState({
        loading: true,
      });
      try {
        const { data } = await searchImages(search);
        this.setState({
          items: data?.length ? data : [],
        });
      } catch (error) {
        this.setState({
          error: message,
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  handleSearch = ({ search }) => {
    this.setState({ search });
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
    const { handleSearch } = this;
    const { items, loading, error } = this.state;
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
          <SearchForm />
          {error && <p>помилка завантаження</p>}
          {loading && <p>...Loading</p>}
          {isItems && <ImageGallery items={items} />}
          {isItems && (
            <div>
              <CustomButton type="button">Load more</CustomButton>
            </div>
          )}
        </>
      </div>
    );
  }
}

// Your API key: 35827866-cac2bfdbcf92b350627521ced
// Uncomment the import and use of getAllPosts once it's properly imported

export default App;

// import { Component } from 'react';
// // import css from './post.module.css';
// import { getAllPosts } from '../../api/posts';

// class Post extends Component {
//   state = {
//     posts: [],
//     loading: false,
//     error: null,
//   };

//   async componentDidMount() {
//     this.setState({ loading: true });
//     try {
//       const { data } = await getAllPosts();
//       this.setState({
//         posts: data?.length ? data : [],
//       });
//     } catch (error) {
//       this.setState({
//         error: error.message,
//       });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }

//     // getAllPosts()
//     //   .then(({ data }) => {
//     //     this.setState({
//     //       posts: data?.length ? data : [],
//     //     });
//     //   })
//     //   .catch(error => {
//     //     this.setState({
//     //       error: error.message,
//     //     });
//     //   })
//     //   .finally(() => {
//     //     this.setState({ loading: false });
//     //   });
//   }

//   render() {
//     const { posts, loading, error } = this.state;
//     const elements = posts.map(({ id, webformatURL, largeImageUR }) => (
//       <li key={id}>
//         {webformatURL}
//         {largeImageUR}
//       </li>
//     ));

//     return (
//       <>
//         {error && <p>помилка завантаження</p>}
//         {loading && <p>...Loading</p>}
//         {Boolean(elements.length)}
//         <ul>{elements}</ul>
//       </>
//     );
//   }
// }

// export default Post;
// 'https://pixabay.com/api/?q=cat&page=1&key=35827866-cac2bfdbcf92b350627521ced&image_type=photo&orientation=horizontal&per_page=12';
