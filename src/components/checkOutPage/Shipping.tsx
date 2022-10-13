import React, { ChangeEvent, SyntheticEvent, SetStateAction, Dispatch, Fragment } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { IsValidProps } from '../../types/Types';

interface ShippingProps {
  setIsValid: Dispatch<SetStateAction<IsValidProps>>;
}

function Shipping({ setIsValid }: ShippingProps) {
  const { storePickUp, setStorePickUp, shippingForm, setShippingForm, setBillingShippingSame } =
    useCheckOutContext();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsValid((isValid) => ({
      ...isValid,
      shipping: true,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((shippingForm) => ({
      ...shippingForm,
      [name]: value,
    }));
  };

  const handleInStorePickUp = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'yes') {
      setShippingForm({
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        email: '',
        phone_number: '',
      });
      setBillingShippingSame(false);
      setIsValid((isValid) => ({
        ...isValid,
        shipping: true,
      }));
      return setStorePickUp(true);
    }
    setStorePickUp(false);
  };

  return (
    <div className="forms-container">
      <form className="checkout-grid shipping" onSubmit={handleSubmit}>
        <h3 className="form-header">Shipping</h3>
        <div className="radio-container">
          <div className="title">Pick Up In Store</div>
          <div className="choices">
            <div className="choice-yes">
              <input
                type="radio"
                id="yes-pick-up"
                name="store_pickup"
                value="yes"
                checked={storePickUp === true}
                required
                onChange={handleInStorePickUp}
              />
              <label htmlFor="yes-pick-up">Yes</label>
            </div>
            <div className="choice-no">
              <input
                type="radio"
                id="no-pick-up"
                name="store_pickup"
                value="no"
                checked={storePickUp === false}
                required
                onChange={handleInStorePickUp}
              />
              <label htmlFor="no-pick-up">No</label>
            </div>
          </div>
        </div>
        {Object.entries(shippingForm).map((entry) => {
          const key = entry[0];
          const value = entry[1];
          return (
            <Fragment key={key}>
              <label htmlFor={key}>{key.replaceAll('_', ' ')}</label>
              <input
                type="text"
                name={key}
                id={key}
                placeholder={key.replaceAll('_', ' ')}
                value={storePickUp ? '' : value}
                disabled={storePickUp ? true : false}
                required
                onChange={handleChange}
              />
            </Fragment>
          );
        })}
        <div className="button-container">
          <button type="submit" className="proceed">
            Proceed To Billing
          </button>
        </div>
        <div className="up-next form-footer">Up Next: Billing</div>
      </form>
    </div>
  );
}

export default Shipping;
