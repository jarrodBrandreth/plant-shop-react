import React, { ChangeEvent, SyntheticEvent, SetStateAction, Dispatch } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
import { ReactComponent as CardIcon } from '../../assets/icons/card-outline.svg';
import { getInputType, getPattern } from '../../helperFunctions/helperFunctions';
import { IsValidProps } from '../../types/Types';

interface BillingProps {
  setIsValid: Dispatch<SetStateAction<IsValidProps>>;
}

function Billing({ setIsValid }: BillingProps) {
  const { billingForm, setBillingForm, storePickUp, billingShippingSame, setBillingShippingSame } =
    useCheckOutContext();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsValid((isValid) => ({
      ...isValid,
      billing: true,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingForm((billingForm) => ({
      ...billingForm,
      [name]: value,
    }));
  };

  const handleBillingSameAsShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'yes') setBillingShippingSame(true);
    if (e.target.value === 'no') {
      setBillingForm((billingForm) => ({
        ...billingForm,
        name_on_card: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        email: '',
        phone_number: '',
      }));
      setBillingShippingSame(false);
    }
  };

  const billingDisabledOptions = [
    'name_on_card',
    'address',
    'city',
    'state',
    'postal_code',
    'email',
    'phone_number',
  ];

  return (
    <section className="billing">
      <header className="banner header">
        <CardIcon width="26px" />
        <h3>Billing</h3>
      </header>
      <form className="billing-form" onSubmit={handleSubmit}>
        <div className="button-container top">
          <button
            type="button"
            className="previous form-btn-style"
            onClick={() => {
              setIsValid((isValid) => ({
                ...isValid,
                shipping: false,
              }));
            }}
          >
            Back To Shipping
          </button>
        </div>
        {!storePickUp && (
          <div className="radio-container form-entry">
            <div className="left">Billing same as shipping</div>
            <div className="choices right">
              <div className="choice-yes">
                <input
                  type="radio"
                  id="yes-same"
                  name="billingShippingSame"
                  value="yes"
                  required
                  checked={billingShippingSame === true}
                  onChange={handleBillingSameAsShippingChange}
                />
                <label htmlFor="yes-same">Yes</label>
              </div>
              <div className="choice-no">
                <input
                  type="radio"
                  id="no-same"
                  name="billingShippingSame"
                  value="no"
                  required
                  checked={billingShippingSame === false}
                  onChange={handleBillingSameAsShippingChange}
                />
                <label htmlFor="no-same">No</label>
              </div>
            </div>
          </div>
        )}
        {Object.keys(billingForm).map((key) => {
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
                value={billingForm[key]}
                pattern={regexResult?.pattern}
                title={regexResult?.title}
                required
                disabled={
                  billingShippingSame && billingDisabledOptions.includes(key) ? true : false
                }
                onChange={handleChange}
              />
            </div>
          );
        })}
        <div className="button-container">
          <button type="submit" className="form-btn-style proceed">
            Proceed To Confirmation
          </button>
        </div>
      </form>
      <footer className="banner footer">Up next: Confirmation</footer>
    </section>
  );
}

export default Billing;
