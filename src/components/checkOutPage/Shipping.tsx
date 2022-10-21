import React, { ChangeEvent, SyntheticEvent, SetStateAction, Dispatch } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { ReactComponent as ShippingIcon } from '../../assets/icons/bus-outline.svg';
import { getInputType, getPattern } from '../../helperFunctions/helperFunctions';
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
    <section className="shipping">
      <header className="banner header">
        <ShippingIcon width="26px" />
        <h3>Shipping</h3>
      </header>
      <form className="shipping-form" onSubmit={handleSubmit}>
        <div className="radio-container form-entry">
          <div className="left">Pick Up In Store</div>
          <div className="choices right">
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
        {Object.keys(shippingForm).map((key) => {
          const regexResult = getPattern(key);
          return (
            <div className="form-entry" key={key}>
              <label className="left" htmlFor={key}>
                {key.replaceAll('_', ' ')}
              </label>
              <input
                className="right"
                type={getInputType(key)}
                name={key}
                id={key}
                placeholder={key.replaceAll('_', ' ')}
                value={shippingForm[key]}
                pattern={regexResult?.pattern}
                title={regexResult?.title}
                disabled={storePickUp ? true : false}
                required
                onChange={handleChange}
              />
            </div>
          );
        })}
        <div className="button-container">
          <button type="submit" className="form-btn-style proceed ">
            Proceed To Billing
          </button>
        </div>
      </form>
      <footer className="banner footer">Up Next: Billing</footer>
    </section>
  );
}

export default Shipping;
