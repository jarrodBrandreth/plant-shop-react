import React from 'react';
import { Link } from 'react-router-dom';
import { CartProductProps } from '../../types/Types';
import { formatCurrency } from '../../currencyFunction';
import { ReactComponent as ArrowForward } from '../../assets/icons/arrow-forward-circle-outline.svg';
import './cartPreview.css';

interface CartPreviewProps {
  items: CartProductProps[];
  totalPrice: number;
}

function CartPreview({ items, totalPrice }: CartPreviewProps) {
  if (items.length < 1)
    return (
      <div className="cart-preview-wrapper">
        <div className="cart-preview">
          <div className="empty-cart">You cart is empty...</div>
        </div>
      </div>
    );

  return (
    <div className="cart-preview-wrapper">
      <div className="cart-preview">
        <h3 className='title'>Cart Preview</h3>
        <div className="items">
          {items.map((item) => {
            return (
              <div key={item.product.id} className="item">
                <h4 className="name">{item.product.name}</h4>
                <div className="price">
                  <span>{formatCurrency(item.product.price)}</span>
                </div>
                <div className="quantity">
                  <h5>Quantity:</h5>
                  <span>{item.quantity}</span>
                </div>
                <img src={item.product.image} alt={item.product.name} />
              </div>
            );
          })}
        </div>
        <div className="total-price">
          <h5>Total:</h5>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <div className="bottom-links">
          <Link className="checkout-link" to="/checkout">
            <span>checkout</span>
            <ArrowForward width="20px" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPreview;
