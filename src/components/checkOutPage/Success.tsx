import React, { useState, Dispatch, SetStateAction, Fragment } from 'react';
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
  const [showShipping, setShowShipping] = useState(true);

  if (order) {
    return (
      <section className="success">
        <h3 className="heading">Thanks For Your Order!</h3>
        <div className="message-container">
          <p className="field">A copy of your receipt will be sent to:</p>
          <p>{order.billing.email}</p>
        </div>
        <div className="message-container">
          <p className="field">Order Number:</p>
          <p>{order.order_number}</p>
        </div>
        <div className="message-container">
          <p className="field">Price:</p>
          <p>{formatCurrency(order.cost.total)}</p>
        </div>
        <div className="shipping-details">
          <div className="heading-wrapper">
            <h4 className="field">Shipping Details</h4>
            <button className="view" onClick={() => setShowShipping(!showShipping)}>
              {showShipping ? 'Show' : 'Hide'}
            </button>
          </div>
          <div className={`details-grid ${showShipping ? 'open' : ''}`}>
            {order.store_pick_up && (
              <>
                <span className="key">Store Pick Up:</span>
                <span className="value">Yes</span>
              </>
            )}
            {!order.store_pick_up &&
              order.shipping &&
              Object.keys(order.shipping).map((key, index) => {
                return (
                  <Fragment key={index}>
                    <span className="key">{key.replaceAll('_', ' ')}:</span>
                    <span className="value">{order.shipping ? order.shipping[key] : null}</span>
                  </Fragment>
                );
              })}
          </div>
        </div>
        <div className="success-items">
          <h4 className="field">Items</h4>
          <div className="items-container">
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
        <h3 className="heading">Order</h3>
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
