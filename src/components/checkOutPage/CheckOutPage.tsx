import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckOutProvider } from '../../context/CheckOutContext';
import { useGlobalContext } from '../../context/GlobalContext';
import OrderSummary from './OrderSummary';
import Shipping from './Shipping';
import Billing from './Billing';
import Confirm from './Confirm';
import Success from './Success';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-back-circle-outline.svg';
import './checkOutPage.css';

function CheckOutPage() {
  const { cart } = useGlobalContext();
  const [isValid, setIsValid] = useState({
    shipping: false,
    billing: false,
    confirmed: false,
  });
  const [startForm, setStartForm] = useState(false);

  if (cart.totalProducts < 1 && !isValid.confirmed) {
    return (
      <main className="checkout-empy">
        <p>You have no items in your cart...</p>
        <Link to="/shop" className="cart-link">
          <ArrowLeft width="18px" />
          Back To Shop
        </Link>
      </main>
    );
  }

  return (
    <CheckOutProvider>
      <main className="checkout page">
        {!isValid.confirmed && (
          <OrderSummary isValid={isValid} startForm={startForm} setStartForm={setStartForm} />
        )}
        {!isValid.shipping && startForm && <Shipping setIsValid={setIsValid} />}
        {isValid.shipping && !isValid.billing && <Billing setIsValid={setIsValid} />}
        {isValid.shipping && isValid.billing && !isValid.confirmed && (
          <Confirm setIsValid={setIsValid} />
        )}
        {isValid.confirmed && <Success setIsValid={setIsValid} />}
      </main>
    </CheckOutProvider>
  );
}

export default CheckOutPage;
