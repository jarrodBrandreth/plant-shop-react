import React from 'react';
import ProductCard from '../productCard/ProductCard';
import { ProductProps } from '../../types/Types';
import './recommendations.css';

interface RecommendationsProps {
  excluded: ProductProps[];
  products: ProductProps[];
  numOfSuggestions: number;
  title: string;
}

function Recommendations({ excluded, products, numOfSuggestions, title }: RecommendationsProps) {
  const excludedIDs = excluded.map((product) => product.id);
  const options = products.filter((product) => excludedIDs.includes(product.id) !== true);

  return (
    <div className="recommendations">
      <h4 className="title">{title}</h4>
      <div className="products">
        {options.length < numOfSuggestions
          ? options.map((item) => {
              return <ProductCard key={item.id} product={item} />;
            })
          : options
              .sort((a, b) => a.price - b.price)
              .slice(0, numOfSuggestions)
              .map((item) => {
                return <ProductCard key={item.id} product={item} />;
              })}
      </div>
    </div>
  );
}

export default Recommendations;
