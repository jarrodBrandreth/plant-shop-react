import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-forward-circle-outline.svg';
import { formatCurrency } from '../../currencyFunction';
import { IsValidProps } from '../../types/Types';

interface SuccessProps {
  setIsValid: Dispatch<SetStateAction<IsValidProps>>;
}

function Success({ setIsValid }: SuccessProps) {
  const { order } = useCheckOutContext();

  if (order) {
    return (
      <section className="success">
        <h3 className="highlight">Order</h3>
        <p className="message">Thanks For Your Order!</p>
        <p className="message">A copy of your receipt will be sent to {order.billing.email}</p>
        <p>Order Number: {order.order_number}</p>
        <p>Price: {formatCurrency(order.cost.total)}</p>
        <div className="items-container">
          <h4>Items</h4>
          {order.order_products.map((item) => {
            return (
              <div key={item.id} className="item-display">
                <img className="image" src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <span className="quantity">({item.quantity})</span>
              </div>
            );
          })}
        </div>
        <Link to="/shop" className="continue-shopping form-btn-style icon-text-link">
          Continue Shopping
          <ArrowRight width="18px" />
        </Link>
      </section>
    );
  } else {
    return (
      <section className="success">
        <h3 className="highlight">Order</h3>
        <p className="message">An error occured, we're looking into it</p>
        <button
          onClick={() => {
            setIsValid((isValid) => ({
              ...isValid,
              confirmed: false,
            }));
          }}
        >
          Back To Confirmation
        </button>
        <Link to="/shop" className="continue-shopping form-btn-style icon-text-link">
          Continue Shopping
          <ArrowRight width="18px" />
        </Link>
      </section>
    );
  }
}

export default Success;
