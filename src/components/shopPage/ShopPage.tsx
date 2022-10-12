import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ProductProps } from '../../types/Types';
import ProductCard from '../productCard/ProductCard';
import SearchBar from '../searchBar/SearchBar';
import AccordionSort from '../accordionSort/AccordionSort';
import './shopPage.css';

interface SortProductsArgs {
  property: keyof ProductProps;
  decreasing: boolean;
}

function ShopPage() {
  const { products } = useGlobalContext();
  const [currentProducts, setCurrentProducts] = useState<Array<ProductProps>>([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortByValue, setSortByValue] = useState<SortProductsArgs | null>(null);

  useEffect(() => {
    setCurrentProducts(() => {
      let results = [...products].filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      if (!sortByValue) {
        return results;
      } else {
        results.sort((a, b) => {
          let propA = a[sortByValue.property];
          let propB = b[sortByValue.property];
          if (typeof propA === 'string' && typeof propB === 'string') {
            propA = propA.toLowerCase();
            propB = propB.toLowerCase();
          }
          if (propA < propB) {
            return -1;
          }
          if (propA > propB) {
            return 1;
          }
          return 0;
        });
      }
      if (sortByValue.decreasing) return results.reverse();
      return results;
    });
  }, [searchValue, sortByValue, products]);

  return (
    <main className="shop page">
      <h2>Store</h2>
      <section className="product-sorting">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
        <AccordionSort
          sortByValue={sortByValue}
          setSortByValue={setSortByValue}
          options={[
            { property: 'price', type: 'number' },
            { property: 'name', type: 'text' },
            { property: 'sun', type: 'number' },
            { property: 'maintenance', type: 'number' },
            { property: 'water', type: 'number' },
          ]}
        />
      </section>
      <section className="products">
        {currentProducts.length < 1 && searchValue && <div>No search results...</div>}
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default ShopPage;
