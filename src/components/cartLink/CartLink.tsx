import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import CartPreview from './CartPreview';
import { ReactComponent as BagIcon } from '../../assets/icons/bag-handle-outline.svg';
import { ReactComponent as LeafIcon } from '../../assets/icons/leaf-sharp.svg';
import './cartLink.css';

function CartLink() {
  const { cart } = useGlobalContext();
  return (
    <div className="cart-link">
      <Link to="/cart">
        <div className="cart-icon-container">
          {cart.totalProducts > 0 && (
            <div className="cart-number">
              <LeafIcon key={cart.totalProducts} className="leaf" width="20px" fill="forestgreen" />
              {cart.totalProducts}
            </div>
          )}
          <BagIcon className="bag" fill="white" width="34px" />
        </div>
      </Link>
      <CartPreview items={cart.items} totalPrice={cart.totalPrice} />
    </div>
  );
}

export default CartLink;
