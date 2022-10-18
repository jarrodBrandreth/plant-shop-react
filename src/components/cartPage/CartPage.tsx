import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import CartPageItem from './CartPageItem';
import Recommendations from '../recommendations/Recommendations';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-forward-circle-outline.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-back-circle-outline.svg';
import { formatCurrency } from '../../currencyFunction';
import './cartPage.css';

function CartPage() {
  const { cart, likedItems } = useGlobalContext();
  const cartItemsProducts = cart.items.map((item) => item.product);

  if (cart.items.length < 1)
    return (
      <section className="cart">
        <div className="cart-heading">
          <h2 className="cart-heading">Cart</h2>
          <div className="empty-text">You cart is currently empty...</div>
          <Link to="/shop" className=" icon-text-link">
            <ArrowLeft width="18px" />
            Back To Shop
          </Link>
        </div>
        {likedItems.length > 0 && (
          <Recommendations
            excluded={cartItemsProducts}
            products={likedItems}
            numOfSuggestions={10}
            title="Consider adding some items you liked to your cart"
          />
        )}
      </section>
    );

  return (
    <div className="cart-wrapper">
      <section className="cart">
        <div className="cart-heading">
          <h2>Cart</h2>
          <div className="link-wrapper">
            <Link className=" icon-text-link" to="/checkout">
              Proceed To Checkout <ArrowRight width="18px" />
            </Link>
          </div>
        </div>
        <div className="cart-products">
          {cart.items.map((item) => (
            <CartPageItem key={item.product.id} item={item} />
          ))}
        </div>
        <div className="cart-footer">
          <div className="total-cart">
            <span className="text">Total Cart:</span>
            <span>{formatCurrency(cart.totalPrice)}</span>
          </div>
          <div className="link-wrapper">
            <Link className="icon-text-link" to="/checkout">
              Proceed To Checkout <ArrowRight width="18px" />
            </Link>
          </div>
        </div>
      </section>
      {likedItems.length > 0 && (
        <Recommendations
          excluded={cartItemsProducts}
          products={likedItems}
          numOfSuggestions={10}
          title="Consider adding some items you liked to your cart"
        />
      )}
    </div>
  );
}

export default CartPage;
