import React from 'react';
import { IsValidProps } from '../../types/Types';
import { formatCurrency } from '../../currencyFunction';
import { useCheckOutContext } from '../../context/CheckOutContext';

interface OrderSummaryProps {
  isValid: IsValidProps;
}

function OrderSummary({ isValid }: OrderSummaryProps) {
  const { orderProducts, cost } = useCheckOutContext();
  return (
    <div className="order-summary forms-container checkout-grid">
      <h3 className="form-header">Order Summary</h3>
      <div className="items">
        <h4 className="heading">Items</h4>
        {orderProducts.map((item) => {
          return (
            <div key={item.id} className="item">
              <span>{item.name}</span>
              <span className="quantity">({item.quantity})</span>
            </div>
          );
        })}
      </div>
      <span className="subtotal text">Subtotal</span>
      <span className="subtotal value">{formatCurrency(cost.subtotal)}</span>
      <span className="tax text">Estimated Tax</span>
      <span className="tax value">{formatCurrency(cost.tax)}</span>
      <span className="shipping text">Shipping</span>
      <span className="shipping value">
        {isValid.shipping ? formatCurrency(cost.shipping) : 'calculated later'}
      </span>
      <span className="total text">Total</span>
      <span className="total value">
        {isValid.shipping ? formatCurrency(cost.total) : 'calculated later'}
      </span>
    </div>
  );
}

export default OrderSummary;
