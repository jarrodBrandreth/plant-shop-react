import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import CartPageItem from './cartPageItem/CartPageItem';
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
      <main className="cart-page">
        <section className="cart">
          <header className="cart-header">
            <h2>Cart</h2>
          </header>
          <div className="empty-text">
            You cart is currently empty...
            <Link to="/shop" className=" icon-text-link">
              <ArrowLeft width="18px" />
              Back To Shop
            </Link>
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
      </main>
    );

  return (
    <main className="cart-page">
      <section className="cart">
        <header className="cart-header">
          <h2>Cart</h2>
          <Link className=" icon-text-link" to="/checkout">
            Proceed To Checkout <ArrowRight width="18px" />
          </Link>
        </header>
        <div className="cart-products">
          {cart.items.map((item) => (
            <CartPageItem key={item.product.id} item={item} />
          ))}
        </div>
        <footer className="cart-footer">
          <div className="total-cart">
            <span className="text">Total Cart:</span>
            <span>{formatCurrency(cart.totalPrice)}</span>
          </div>
          <Link className="icon-text-link" to="/checkout">
            Proceed To Checkout <ArrowRight width="18px" />
          </Link>
        </footer>
      </section>
      {likedItems.length > 0 && (
        <Recommendations
          excluded={cartItemsProducts}
          products={likedItems}
          numOfSuggestions={10}
          title="Consider adding some items you liked to your cart"
        />
      )}
    </main>
  );
}

export default CartPage;
