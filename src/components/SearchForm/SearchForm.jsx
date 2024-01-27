import React, { Component } from 'react';
import css from './searchform.module.css';

class SearchForm extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state }); // Змінено на виклик this.props.onSubmit
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;

    return (
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <div>
          <label>Введіть слово для пошуку зображення</label>
          <input
            className={css.searchFormInput}
            value={search}
            onChange={handleChange}
            required
            type="text"
            name="search"
            placeholder="Введіть слово"
          />
        </div>
        <button className={css.searchFormButton} type="submit">
          Пошук
        </button>
      </form>
    );
  }
}

export default SearchForm;

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
