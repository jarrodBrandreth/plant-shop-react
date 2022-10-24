import { useParams, Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import ProductDetailedView from './ProductDetailedView';
import Recommendations from '../recommendations/Recommendations';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-back-circle-outline.svg';
import { ReactComponent as ChevronPrev } from '../../assets/icons/chevron-back-outline.svg';
import { ReactComponent as ChevronNext } from '../../assets/icons/chevron-forward-outline.svg';
import './productPage.css';

function ProductPage() {
  const { products } = useGlobalContext();
  const { productId } = useParams();
  const currentProduct = products.find(
    (product) => productId && product.id === parseInt(productId),
  );

  const incomingProductId = (direction: 'prev' | 'next') => {
    if (!currentProduct) return undefined;
    const currentIndex = products.indexOf(currentProduct);
    const prev = products[currentIndex - 1];
    const next = products[currentIndex + 1];
    if (direction === 'prev' && prev) return prev.id.toString();
    if (direction === 'next' && next) return next.id.toString();
    return undefined;
  };

  if (!currentProduct)
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
      <h2>{currentProduct.name}</h2>
      <nav className="product-nav">
        <Link
          className={`shop-link ${incomingProductId('prev') ? '' : 'remove'}`}
          to={`/shop/${incomingProductId('prev')}`}
        >
          <ChevronPrev width="26px" />
          Prev
        </Link>
        <Link className="shop-link" to="/shop">
          Back To Store
        </Link>
        <Link
          className={`shop-link ${incomingProductId('next') ? '' : 'remove'}`}
          to={`/shop/${incomingProductId('next')}`}
        >
          Next
          <ChevronNext width="26px" />
        </Link>
      </nav>
      <ProductDetailedView product={currentProduct} />
      <Recommendations
        excluded={[currentProduct]}
        products={products}
        numOfSuggestions={5}
        title="You Might Also Be Interested In These"
      />
    </main>
  );
}

export default ProductPage;
