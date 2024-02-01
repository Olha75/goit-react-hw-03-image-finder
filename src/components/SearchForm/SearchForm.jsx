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
    this.props.onSubmit({ ...this.state });
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;

    return (
      <header className={css.header}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <div>
            <label></label>
            <input
              className={css.searchFormInput}
              value={search}
              onChange={handleChange}
              required
              type="text"
              name="search"
              placeholder="Введіть слово"
              autoFocus
            />
          </div>
          <button className={css.searchFormButton} type="submit">
            Пошук
          </button>
        </form>
      </header>
    );
  }
}

export default SearchForm;
