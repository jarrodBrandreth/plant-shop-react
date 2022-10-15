import React from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { formatCurrency } from '../../currencyFunction';
import { IsValidProps } from '../../types/Types';

interface OrderSummaryProps {
  isValid: IsValidProps;
}

function OrderSummary({ isValid }: OrderSummaryProps) {
  const { orderProducts, cost } = useCheckOutContext();
  return (
    <section className="order-summary">
      <h3 className="">Order Summary</h3>
      <div className="items-container">
        <h4 className="heading highlight">Items</h4>
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
      <div className="price-breakdown two-column-grid">
        <span className="highlight">Subtotal:</span>
        <span className="">{formatCurrency(cost.subtotal)}</span>
        <span className="highlight">Estimated Tax:</span>
        <span className="">{formatCurrency(cost.tax)}</span>
        <span className="highlight">Shipping:</span>
        <span className="">
          {isValid.shipping ? formatCurrency(cost.shipping) : 'calculated later'}
        </span>
        <span className="highlight">Total:</span>
        <span className="">
          {isValid.shipping ? formatCurrency(cost.total) : 'calculated later'}
        </span>
      </div>
    </section>
  );
}

export default OrderSummary;
