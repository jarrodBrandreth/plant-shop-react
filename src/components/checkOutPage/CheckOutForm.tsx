import React, { useState } from 'react';
import Shipping from './Shipping';
import Billing from './Billing';
import ConfirmationDetails from './ConfirmationDetails';
import { CheckOutProvider } from '../../context/CheckOutContext';
import './checkOutForm.css';

function CheckOutForm() {
  const [shippingIsValid, setShippingIsValid] = useState(false);
  const [billingIsValid, setBillingIsValid] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="forms-container">
      <CheckOutProvider>
        {!shippingIsValid && <Shipping setShippingIsValid={setShippingIsValid} />}
        {shippingIsValid && !billingIsValid && (
          <Billing
            setBillingIsValid={setBillingIsValid}
            setShippingIsValid={setShippingIsValid}
          />
        )}
        {shippingIsValid && billingIsValid && (
          <ConfirmationDetails
            setBillingIsValid={setBillingIsValid}
            setShippingIsValid={setShippingIsValid}
          />
        )}
      </CheckOutProvider>
    </div>
  );
}

export default CheckOutForm;
