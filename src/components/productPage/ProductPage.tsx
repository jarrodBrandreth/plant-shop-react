import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import ProductDetailedView from './ProductDetailedView';
import Recommendations from '../recommendations/Recommendations';
import { ProductProps } from '../../types/Types';
import './productPage.css';

function ProductPage() {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const { productId } = useParams();
  const { products } = useGlobalContext();

  useEffect(() => {
    if (!productId) return;

    const getProduct = (paramsId: string) => {
      const currentProduct = products.find((product) => product.id === parseInt(paramsId));
      if (currentProduct) setProduct(currentProduct);
    };

    getProduct(productId);
  }, [productId, products]);

  if (!product) return <div>No product found</div>;

  return (
    <main className="product-page page">
      <h2>{product.name}</h2>
      <ProductDetailedView product={product} />
      <Recommendations
        excluded={[product]}
        products={products}
        numOfSuggestions={5}
        title="You Might Also Be Interested In These"
      />
    </main>
  );
}

export default ProductPage;
