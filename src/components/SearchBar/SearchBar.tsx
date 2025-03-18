import { useState } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  handleSubmit: (search: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ handleSubmit }) => {
  const [search, setSearch] = useState<string>('');

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!search.trim()) {
      toast.error('Please enter text to search for images');
      return;
    }
    handleSubmit(search.trim());
    setSearch('');
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
        onChange={e => setSearch(e.target.value)}
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
};
