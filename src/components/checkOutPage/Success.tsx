import React, { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../currencyFunction';
import { IsValidProps } from '../../types/Types';

import { useCheckOutContext } from '../../context/CheckOutContext';

interface SuccessProps {
  setIsValid: Dispatch<SetStateAction<IsValidProps>>;
}

function Success({ setIsValid }: SuccessProps) {
  const { order } = useCheckOutContext();

  if (order) {
    return (
      <div>
        <p>Thanks For Your Order!</p>
        <p>Order Number:{order.order_number}</p>
        <p>Price:{formatCurrency(order.cost.total)}</p>
        <p>A copy of your receipt will be sent to {order.billing.email}</p>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    );
  } else {
    return (
      <div>
        <p>An error occured, we're looking into it</p>
        <button
          onClick={() => {
            setIsValid((isValid) => ({
              ...isValid,
              confirmed: false,
            }));
          }}
        >
          Try Again
        </button>
      </div>
    );
  }
}

export default Success;
