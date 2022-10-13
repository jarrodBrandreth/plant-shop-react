import React, { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import OrderSummary from './OrderSummary';
import Shipping from './Shipping';
import Billing from './Billing';
import Confirm from './Confirm';
import Success from './Success';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-back-circle-outline.svg';
import { CheckOutProvider } from '../../context/CheckOutContext';
import './checkOutForm.css';

function CheckOutPage() {
  const { cart } = useGlobalContext();
  const [isValid, setIsValid] = useState({
    shipping: false,
    billing: false,
    confirmed: false,
  });

  if (cart.totalProducts < 1 && !isValid.confirmed) {
    return (
      <div className="checkout-empy">
        <p>You have no items in your cart...</p>
        <Link to="/shop" className="cart-link">
          <ArrowLeft width="18px" />
          Back To Shop
        </Link>
      </div>
    );
  }

  return (
    <CheckOutProvider>
      <div>
        {!isValid.confirmed && <OrderSummary isValid={isValid} />}
        {!isValid.shipping && <Shipping setIsValid={setIsValid} />}
        {isValid.shipping && !isValid.billing && <Billing setIsValid={setIsValid} />}
        {isValid.shipping && isValid.billing && !isValid.confirmed && (
          <Confirm setIsValid={setIsValid} />
        )}
        {isValid.confirmed && <Success setIsValid={setIsValid} />}
      </div>
    </CheckOutProvider>
  );
}

export default CheckOutPage;
