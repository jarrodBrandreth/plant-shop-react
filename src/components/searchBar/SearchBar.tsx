import React, { ChangeEvent, Dispatch, SetStateAction, KeyboardEvent } from 'react';
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/search-sharp.svg';
import { ReactComponent as Clear } from '../../assets/icons/close-outline.svg';
import './searchBar.css';

interface SearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

function SearchBar({ searchValue, setSearchValue }: SearchBarProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const loseFocus = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') return event.currentTarget.blur();
  };

  return (
    <div className="search-bar">
      <label htmlFor="search">Search</label>
      <MagnifyingGlass className="magnifying icon" width="20px" fill="black" />
      <input
        onChange={handleChange}
        onKeyUp={loseFocus}
        value={searchValue}
        type="text"
        id="search"
        name="search"
        placeholder="Search Products"
      />
      <button
        className="clear-search icon"
        onClick={() => setSearchValue('')}
        aria-label="clear search input"
      >
        <Clear width="20px" color="black" />
      </button>
    </div>
  );
}

export default SearchBar;
