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
    placeOrder();
    setIsValid((isValid) => ({
      ...isValid,
      confirmed: true,
    }));
  };

  return (
    <section className="confirmation">
      <h3 className="banner">Confirmation Details</h3>
      <p className="description">Please confirm your information before proceeding</p>
      <div className="two-column-grid">
        <div className="details-heading">
          <h4 className="highlight">Shipping Details</h4>
          <button
            className="edit form-btn-style"
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
            <span className="key">Store Pick Up:</span>
            <span className="value">Yes</span>
          </>
        )}
        {!storePickUp &&
          Object.entries(shippingForm).map((entry, index) => {
            return (
              <Fragment key={index}>
                <span className="key">{entry[0].replaceAll('_', ' ')}:</span>
                <span className="value">{entry[1]}</span>
              </Fragment>
            );
          })}
        <div className="details-heading">
          <h4 className="highlight">Billing Details</h4>
          <button
            className="edit form-btn-style"
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
              <span className="key">{entry[0].replaceAll('_', ' ')}:</span>
              <span className="value">{entry[1]}</span>
            </Fragment>
          );
        })}

        <div className="button-container confirm">
          <button type="submit" className="form-btn-style proceed" onClick={() => confirmOrder()}>
            Confirm Order
          </button>
        </div>
      </div>
      <div className="banner foot">Up Next: Order Details</div>
    </section>
  );
}

export default Confirm;
