import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ProductProps } from '../../types/Types';
import ProductCard from '../productCard/ProductCard';
import SearchBar from '../searchBar/SearchBar';
import Accordion from '../accordion/Accordion';
import './shopPage.css';

interface SortProductsArgs {
  property: keyof ProductProps;
  decreasing: boolean;
}

function ShopPage() {
  const { products } = useGlobalContext();
  const [currentProducts, setCurrentProducts] = useState<Array<ProductProps>>([]);

  const searchFunction = (val: string) => {
    const results = [...products].filter((product) =>
      product.name.toLowerCase().includes(val.toLowerCase()),
    );
    setCurrentProducts(results);
  };

  const sortProducts = ({ property, decreasing }: SortProductsArgs) => {
    let results = currentProducts.sort((a, b) => {
      let propA = a[property];
      let propB = b[property];
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
    if (decreasing) results = results.reverse();
    return setCurrentProducts([...results]);
  };

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  return (
    <main className="shop page">
      <h2>Store</h2>
      <section className="product-sorting">
        <SearchBar searchFunction={searchFunction} />
        <Accordion
          title="Sort By"
          handlerFunction={sortProducts}
          options={[
            {
              innerText: 'Price high to low',
              functionArgs: { property: 'price', decreasing: true },
            },
            {
              innerText: 'Price low to high',
              functionArgs: { property: 'price', decreasing: false },
            },

            { innerText: 'Name A - Z', functionArgs: { property: 'name', decreasing: false } },
            { innerText: 'Name Z - A', functionArgs: { property: 'name', decreasing: true } },
            {
              innerText: 'Sun Needs high to low',
              functionArgs: { property: 'sun', decreasing: true },
            },
            {
              innerText: 'Sun Needs low to high',
              functionArgs: { property: 'sun', decreasing: false },
            },
            {
              innerText: 'Maintenance high to low',
              functionArgs: { property: 'maintenance', decreasing: true },
            },
            {
              innerText: 'Maintenance low to high',
              functionArgs: { property: 'maintenance', decreasing: false },
            },
            {
              innerText: 'Water usage high to low',
              functionArgs: { property: 'water', decreasing: true },
            },
            {
              innerText: 'Water usage low to high',
              functionArgs: { property: 'water', decreasing: false },
            },
          ]}
        />
      </section>
      <section className="products">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}

export default ShopPage;
