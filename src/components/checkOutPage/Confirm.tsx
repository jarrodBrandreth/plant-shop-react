import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { IsValidProps } from '../../types/Types';

interface ConfirmProps {
  setIsValid: Dispatch<SetStateAction<IsValidProps>>;
}

function Confirm({ setIsValid }: ConfirmProps) {
  const { storePickUp, shippingForm, billingForm, placeOrder } = useCheckOutContext();

  const cardDisplay = (cardNumber: string): string => {
    return (
      '...' +
      cardNumber
        .split('')
        .slice(cardNumber.length - 4, cardNumber.length)
        .join('')
    );
  };
  const confirmOrder = () => {
    console.log('place order');
    placeOrder();
    setIsValid((isValid) => ({
      ...isValid,
      confirmed: true,
    }));
  };

  return (
    <div className="forms-container confirmation checkout-grid">
      <h3 className="form-header">Confirmation Details</h3>
      <p className="description">Please confirm your information before proceeding</p>
      <div className="details-heading">
        <h4 className="heading">Shipping Details</h4>
        <button
          className="edit shipping"
          onClick={() => {
            setIsValid((isValid) => ({
              ...isValid,
              shipping: false,
            }));
          }}
        >
          edit
        </button>
      </div>
      {storePickUp && (
        <>
          <span className="key">Store Pick Up</span>
          <span className="value">Yes</span>
        </>
      )}
      {!storePickUp &&
        Object.entries(shippingForm).map((entry, index) => {
          return (
            <Fragment key={index}>
              <span className="key">{entry[0].replaceAll('_', ' ')}</span>
              <span className="value">{entry[1]}</span>
            </Fragment>
          );
        })}
      <div className="details-heading">
        <h4 className="heading">Billing Details</h4>
        <button
          className="edit billing"
          onClick={() => {
            setIsValid((isValid) => ({
              ...isValid,
              billing: false,
            }));
          }}
        >
          edit
        </button>
      </div>
      {Object.entries(billingForm).map((entry, index) => {
        if (entry[0] === 'card_number') {
          entry[1] = cardDisplay(entry[1]);
        }
        return (
          <Fragment key={index}>
            <span className="key">{entry[0].replaceAll('_', ' ')}</span>
            <span className="value">{entry[1]}</span>
          </Fragment>
        );
      })}
      <div className="button-container confirm">
        <button type="submit" className="proceed" onClick={() => confirmOrder()}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Confirm;
