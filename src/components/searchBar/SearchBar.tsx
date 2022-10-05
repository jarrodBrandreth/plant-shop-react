import React, { ChangeEvent, useRef } from 'react';
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/search-sharp.svg';
import { ReactComponent as Clear } from '../../assets/icons/close-outline.svg';
import './searchBar.css';

interface SearchBarProps {
  searchFunction: (val: string) => void;
}

function SearchBar({ searchFunction }: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    searchFunction(event.target.value);
  };
  const clearInput = () => {
    if (searchInputRef.current !== null) {
      searchInputRef.current.value = '';
      searchFunction('');
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="search-bar">
      <label htmlFor="search">Search</label>
      <MagnifyingGlass width="20px" fill="black" />
      <input
        ref={searchInputRef}
        onChange={handleChange}
        type="text"
        id="search"
        name="search"
        placeholder="Search Products"
      />
      <Clear
        aria-roledescription="clear search input"
        onClick={clearInput}
        width="20px"
        color="black"
        cursor={'pointer'}
      />
    </div>
  );
}

export default SearchBar;
