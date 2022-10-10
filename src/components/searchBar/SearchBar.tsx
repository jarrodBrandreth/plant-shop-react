import React, { useState, useEffect, ChangeEvent } from 'react';
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/search-sharp.svg';
import { ReactComponent as Clear } from '../../assets/icons/close-outline.svg';
import './searchBar.css';

interface SearchBarProps {
  searchFunction: (val: string) => void;
}

function SearchBar({ searchFunction }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    searchFunction(searchValue);
  }, [searchValue]);

  return (
    <div className="search-bar">
      <label htmlFor="search">Search</label>
      <MagnifyingGlass width="20px" fill="black" />
      <input
        onChange={handleChange}
        value={searchValue}
        type="text"
        id="search"
        name="search"
        placeholder="Search Products"
      />
      <Clear
        aria-roledescription="clear search input"
        onClick={() => setSearchValue('')}
        width="20px"
        color="black"
        cursor={'pointer'}
      />
    </div>
  );
}

export default SearchBar;
