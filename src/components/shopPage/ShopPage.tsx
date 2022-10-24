import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ProductProps } from '../../types/Types';
import ProductCard from '../productCard/ProductCard';
import SearchBar from '../searchBar/SearchBar';
import AccordionSort from '../accordionSort/AccordionSort';
import { ReactComponent as LeafIcon } from '../../assets/icons/leaf-sharp.svg';
import './shopPage.css';

interface SortProductsArgs {
  property: keyof ProductProps;
  decreasing: boolean;
}

function ShopPage() {
  const { products, productStatus } = useGlobalContext();
  const [searchValue, setSearchValue] = useState('');
  const [sortByValue, setSortByValue] = useState<SortProductsArgs | null>(null);

  const currentProducts = (searchValue: string, sortByValue: SortProductsArgs | null) => {
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
  };

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
        {currentProducts(searchValue, sortByValue).length < 1 ? (
          <div>No search results...</div>
        ) : (
          currentProducts(searchValue, sortByValue).map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        )}
      </section>
      {productStatus.loading && (
        <div className="loading-screen">
          <LeafIcon className="leaf" width="60px" fill="forestgreen" />
          Loading Products...
        </div>
      )}
    </main>
  );
}

export default ShopPage;
