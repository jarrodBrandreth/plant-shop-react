import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ReactComponent as MagnifyingGlass } from '../../assets/icons/search-sharp.svg';
import { ReactComponent as Clear } from '../../assets/icons/close-outline.svg';
import { ProductProps } from '../../types/Types';
import './searchBar.css';

interface SearchBarProps {
  products: ProductProps[];
  setCurrentProducts: Dispatch<SetStateAction<ProductProps[]>>;
}

function SearchBar({ setCurrentProducts, products }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setCurrentProducts(() => {
      return [...products].filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
    });
  }, [searchValue, products]);

  return (
    <div className="search-bar">
      <label htmlFor="search">Search</label>
      <MagnifyingGlass className="magnifying icon" width="20px" fill="black" />
      <input
        onChange={handleChange}
        value={searchValue}
        type="text"
        id="search"
        name="search"
        placeholder="Search Products"
      />
      <Clear
        className="clear-search icon"
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
