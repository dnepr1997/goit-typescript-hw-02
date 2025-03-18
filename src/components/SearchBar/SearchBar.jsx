import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';
export const SearchBar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  const onSubmit = evt => {
    evt.preventDefault();
    if (!search.trim()) {
      toast.error('Please enter text to search for images');
      return;
    }
    handleSubmit(search.trim());
    evt.target.reset();
  };
  return (
    <form onSubmit={onSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        name="query"
        value={search}
        autoFocus
        placeholder="Search images and photos"
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};
