import React, { useState, Dispatch, SetStateAction } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down-sharp.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up-sharp.svg';
import { formatCurrency } from '../../currencyFunction';
import { IsValidProps } from '../../types/Types';

interface OrderSummaryProps {
  isValid: IsValidProps;
  startForm: boolean;
  setStartForm: Dispatch<SetStateAction<boolean>>;
}

function OrderSummary({ isValid, startForm, setStartForm }: OrderSummaryProps) {
  const { orderProducts, cost, storePickUp } = useCheckOutContext();
  const [show, setShow] = useState(false);
  return (
    <>
      {startForm && (
        <button className="show-order-summary" onClick={() => setShow(!show)}>
          Order Summary
          {show ? <ArrowUp width="16px" /> : <ArrowDown width="16px" />}
        </button>
      )}
      <div className={`order-summary-wrapper ${startForm ? 'started' : ''} ${show ? 'show' : ''}`}>
        <section className="order-summary">
          <h3>Order Summary</h3>
          <h4>Items</h4>
          <div className="items-container">
            {orderProducts.map((item) => {
              return (
                <div key={item.id} className="item-display">
                  <img className="image" src={item.image} alt={item.name} />
                  <span>{item.name}</span>
                  <span className="quantity">({item.quantity})</span>
                </div>
              );
            })}
          </div>
          <div className="price-breakdown">
            <span className="bold">Subtotal:</span>
            <span>{formatCurrency(cost.subtotal)}</span>
            <span className="bold">Estimated Tax:</span>
            <span>{formatCurrency(cost.tax)}</span>
            <span className="bold">Shipping:</span>
            <span>
              {!isValid.shipping && 'calculated later'}
              {isValid.shipping && storePickUp && 'pick up'}
              {isValid.shipping && !storePickUp && formatCurrency(cost.shipping)}
            </span>
            <span className="bold">Total:</span>
            <span>{isValid.shipping ? formatCurrency(cost.total) : 'calculated later'}</span>
          </div>
          {!startForm && (
            <div className="button-container">
              <button className="form-btn-style proceed" onClick={() => setStartForm(true)}>
                Continue
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default OrderSummary;
