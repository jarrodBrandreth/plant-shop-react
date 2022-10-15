import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import ProductDetailedView from './ProductDetailedView';
import Recommendations from '../recommendations/Recommendations';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-back-circle-outline.svg';
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

  if (!product)
    return (
      <main className="product-page page">
        <div>No product found...</div>
        <Link className="shop-link" to="/shop">
          <ArrowLeft width="24px" />
          To Store
        </Link>
        <Recommendations
          excluded={[]}
          products={products}
          numOfSuggestions={5}
          title="You Might Be Interested In These"
        />
      </main>
    );

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
