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
  const { shippingForm, billingForm } = useCheckOutContext();
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
    console.log(shippingForm, billingForm, cart.items);
    console.log(uuidv4());
    // merge shipping,billing,cart items, add order#, and date/time
    // send to server show user success components with order number items and price
    // send info somewhere
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
      <span className="value">{shippingForm.firstName}</span>
      <span className="key">Last Name:</span>
      <span className="value">{shippingForm.lastName}</span>
      <span className="key">Address:</span>
      <span className="value">{shippingForm.address}</span>
      <span className="key">City:</span>
      <span className="value">{shippingForm.city}</span>
      <span className="key">State:</span>
      <span className="value">{shippingForm.state}</span>
      <span className="key">Postal Code:</span>
      <span className="value">{shippingForm.postalCode}</span>
      <span className="key">Email:</span>
      <span className="value">{shippingForm.email}</span>
      <span className="key">Phone Number:</span>
      <span className="value">{shippingForm.phoneNumber}</span>
      <div className="details-heading">
        <h4 className="heading">Billing Details</h4>
        <button className="edit billing" onClick={() => setBillingIsValid(false)}>
          edit
        </button>
      </div>
      <span className="key">Name:</span>
      <span className="value">{billingForm.nameOnCard}</span>
      <span className="key">Address:</span>
      <span className="value">{billingForm.address}</span>
      <span className="key">City:</span>
      <span className="value">{billingForm.city}</span>
      <span className="key">State:</span>
      <span className="value">{billingForm.state}</span>
      <span className="key">Postal Code:</span>
      <span className="value">{billingForm.postalCode}</span>
      <span className="key">Email:</span>
      <span className="value">{billingForm.email}</span>
      <span className="key">Phone Number:</span>
      <span className="value">{billingForm.phoneNumber}</span>
      <span className="key">Card Number:</span>
      <span className="value">{cardDisplay(billingForm.cardNumber)}</span>
      <span className="key">Card Expiration:</span>
      <span className="value">{billingForm.cardExpiration}</span>
      <span className="key">CVV:</span>
      <span className="value">{billingForm.cardCVV}</span>
      <div className="button-container confirm">
        <button type="submit" className="proceed" onClick={() => placeOrder()}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmationDetails;
