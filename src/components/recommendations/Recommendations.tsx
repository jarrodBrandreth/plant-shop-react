import React, { useEffect, useState } from 'react';
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
  const [recommendations, setRecommendations] = useState<Array<ProductProps>>([]);

  useEffect(() => {
    const excludedIDs = excluded.map((product) => product.id);
    const options = products.filter((product) => excludedIDs.includes(product.id) !== true);
    if (options.length < numOfSuggestions) return setRecommendations([...products]);
    options.sort((a, b) => a.price - b.price);
    setRecommendations(options.slice(0, numOfSuggestions));
  }, [excluded, numOfSuggestions, products]);

  return (
    <div className="recommendations">
      <h4 className="title">{title}</h4>
      <div className="products">
        {recommendations.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
