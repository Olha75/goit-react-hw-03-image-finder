import React, { Component } from 'react';
import css from './searchBar.module.css';

class Searchbar extends Component {
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
    this.props.onSubmit({ search: this.state.search });
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
            <label>
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
            </label>
          </div>
          <button className={css.searchFormButton} type="submit">
            Пошук
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
