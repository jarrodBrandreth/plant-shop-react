import React, { Dispatch, Fragment, SetStateAction } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import { useCheckOutContext } from '../../context/CheckOutContext';

interface ConfirmationDetailsProps {
  setShippingIsValid: Dispatch<SetStateAction<boolean>>;
  setBillingIsValid: Dispatch<SetStateAction<boolean>>;
}

function ConfirmationDetails({ setBillingIsValid, setShippingIsValid }: ConfirmationDetailsProps) {
  const { cart } = useGlobalContext();
  const { orderForm, setOrder } = useCheckOutContext();
  const cardDisplay = (cardNumber: string): string => {
    return (
      '...' +
      cardNumber
        .split('')
        .slice(cardNumber.length - 4, cardNumber.length)
        .join('')
    );
  };

  const orderProductsArray = cart.items.map((currentProduct) => {
    return {
      id: currentProduct.product.id,
      name: currentProduct.product.name,
      quantity: currentProduct.quantity,
    };
  });

  const placeOrder = () => {
    console.log('place order');
    setOrder({
      order_number: uuidv4(),
      ...orderForm,
      products: orderProductsArray,
    });
    console.log({
      order_number: uuidv4(),
      ...orderForm,
      products: orderProductsArray,
    });
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
      {Object.entries(orderForm.shipping).map((entry, index) => {
        return (
          <Fragment key={index}>
            <span className="key">{entry[0].replaceAll('_', ' ')}</span>
            <span className="value">{entry[1]}</span>
          </Fragment>
        );
      })}
      <div className="details-heading">
        <h4 className="heading">Billing Details</h4>
        <button className="edit billing" onClick={() => setBillingIsValid(false)}>
          edit
        </button>
      </div>
      {Object.entries(orderForm.billing).map((entry, index) => {
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
        <button type="submit" className="proceed" onClick={() => placeOrder()}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmationDetails;
