import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { ReactComponent as ListIcon } from '../../assets/icons/list-outline.svg';
import { ReactComponent as LeafIcon } from '../../assets/icons/leaf-sharp.svg';
import { IsValidProps } from '../../types/Types';

interface ConfirmProps {
  setIsValid: Dispatch<SetStateAction<IsValidProps>>;
}

function Confirm({ setIsValid }: ConfirmProps) {
  const { storePickUp, shippingForm, billingForm, placeOrder } = useCheckOutContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const cardDisplay = (cardNumber: string): string => {
    console.log(cardNumber);
    return (
      '...' +
      cardNumber
        .split('')
        .slice(cardNumber.length - 4, cardNumber.length)
        .join('')
    );
  };

  const processOrder = () => {
    setIsProcessing(false);
    placeOrder();
    setIsValid((isValid) => ({
      ...isValid,
      confirmed: true,
    }));
  };

  const confirmOrder = () => {
    setIsProcessing(true);
    setTimeout(processOrder, 5000);
  };

  return (
    <>
      {isProcessing && (
        <div className="loading-screen">
          <LeafIcon className="leaf" width="60px" fill="forestgreen" />
          Processing Order...
        </div>
      )}
      <section className="confirmation">
        <header className="banner header">
          <ListIcon width="26px" />
          <h3>Confirmation Details</h3>
        </header>
        <p className="description">Please confirm your information before proceeding</p>
        <div className="details-grid">
          <h4 className="title key">Shipping Details</h4>
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
          {storePickUp && (
            <>
              <span className="key">Store Pick Up:</span>
              <span className="value">Yes</span>
            </>
          )}
          {!storePickUp &&
            Object.keys(shippingForm).map((key, index) => {
              return (
                <Fragment key={index}>
                  <span className="key">{key.replaceAll('_', ' ')}:</span>
                  <span className="value">{shippingForm[key]}</span>
                </Fragment>
              );
            })}
        </div>
        <div className="details-grid">
          <h4 className="title key">Billing Details</h4>
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
          {Object.keys(billingForm).map((key, index) => {
            return (
              <Fragment key={index}>
                <span className="key">{key.replaceAll('_', ' ')}:</span>
                <span className="value">
                  {key === 'card_number' ? cardDisplay(billingForm[key]) : billingForm[key]}
                </span>
              </Fragment>
            );
          })}
        </div>
        <div className="button-container confirm">
          <button type="submit" className="form-btn-style proceed" onClick={() => confirmOrder()}>
            Confirm Order
          </button>
        </div>
        <footer className="banner footer">Up Next: Order Details</footer>
      </section>
    </>
  );
}

export default Confirm;
