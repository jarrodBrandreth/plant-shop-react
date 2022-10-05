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
    const getRecommendations = () => {
      // make an array of id's from excluded products
      const excludedIDs = excluded.map((product) => product.id);
      // filter options from excluded products
      const options = products.filter((product) => excludedIDs.includes(product.id) !== true);
      let suggestions:ProductProps[] = [];

      if (options.length < numOfSuggestions) { suggestions = [...options]}
      // get numOfSuggestions amount random products
      while (suggestions.length < numOfSuggestions && options.length > numOfSuggestions) {
        
        const randomIndex = Math.floor(Math.random() * options.length);
        suggestions.push(options[randomIndex]);
        options.splice(randomIndex, 1);
      }
      return setRecommendations(suggestions);
    };
    getRecommendations();
  }, [excluded, products,numOfSuggestions]);

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
