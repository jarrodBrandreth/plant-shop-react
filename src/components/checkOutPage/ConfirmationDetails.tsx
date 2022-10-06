import React, { Dispatch, SetStateAction } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import { useCheckOutContext } from '../../context/CheckOutContext';

interface ConfirmationDetailsProps {
  setShippingIsValid: Dispatch<SetStateAction<boolean>>;
  setBillingIsValid: Dispatch<SetStateAction<boolean>>;
}

function ConfirmationDetails({ setBillingIsValid, setShippingIsValid }: ConfirmationDetailsProps) {
  const { cart } = useGlobalContext();
  const { orderForm } = useCheckOutContext();
  const cardDisplay = (cardNumber: string): string => {
    return (
      '...' +
      cardNumber
        .split('')
        .slice(cardNumber.length - 4, cardNumber.length)
        .join('')
    );
  };

  const placeOrder = () => {
    console.log('place order')
  };

  return (
    <div className="confirmation checkout-grid">
      <h3 className="form-header">Confirmation Details</h3>
      <p className="description">Please confirm your information before proceeding</p>
      <div className="details-heading">
        <h4 className="heading">Shipping Details</h4>
        <button className="edit shipping" onClick={() => setShippingIsValid(false)}>
          edit
        </button>
      </div>
      <span className="key">First Name:</span>
      <span className="value">{orderForm.shipping.first_name}</span>
      <span className="key">Last Name:</span>
      <span className="value">{orderForm.shipping.last_name}</span>
      <span className="key">Address:</span>
      <span className="value">{orderForm.shipping.address}</span>
      <span className="key">City:</span>
      <span className="value">{orderForm.shipping.city}</span>
      <span className="key">State:</span>
      <span className="value">{orderForm.shipping.state}</span>
      <span className="key">Postal Code:</span>
      <span className="value">{orderForm.shipping.postal_code}</span>
      <span className="key">Email:</span>
      <span className="value">{orderForm.shipping.email}</span>
      <span className="key">Phone Number:</span>
      <span className="value">{orderForm.shipping.phone_number}</span>
      <div className="details-heading">
        <h4 className="heading">Billing Details</h4>
        <button className="edit billing" onClick={() => setBillingIsValid(false)}>
          edit
        </button>
      </div>
      <span className="key">Name:</span>
      <span className="value">{orderForm.billing.name_on_card}</span>
      <span className="key">Address:</span>
      <span className="value">{orderForm.billing.address}</span>
      <span className="key">City:</span>
      <span className="value">{orderForm.billing.city}</span>
      <span className="key">State:</span>
      <span className="value">{orderForm.billing.state}</span>
      <span className="key">Postal Code:</span>
      <span className="value">{orderForm.billing.postal_code}</span>
      <span className="key">Email:</span>
      <span className="value">{orderForm.billing.email}</span>
      <span className="key">Phone Number:</span>
      <span className="value">{orderForm.billing.phone_number}</span>
      <span className="key">Card Number:</span>
      <span className="value">{cardDisplay(orderForm.billing.card_number)}</span>
      <span className="key">Card Expiration:</span>
      <span className="value">{orderForm.billing.card_expiration}</span>
      <span className="key">CVV:</span>
      <span className="value">{orderForm.billing.cvv}</span>
      <div className="button-container confirm">
        <button type="submit" className="proceed" onClick={() => placeOrder()}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmationDetails;
