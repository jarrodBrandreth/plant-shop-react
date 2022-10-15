import React, { ChangeEvent, SyntheticEvent, SetStateAction, Dispatch, Fragment } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';
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

  return (
    <section className="billing">
      <h3 className="banner">Billing</h3>
      <form className="two-column-grid" onSubmit={handleSubmit}>
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
          <div className="radio-container">
            <div className="highlight">Billing same as shipping</div>
            <div className="choices">
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
        {Object.entries(billingForm).map((entry) => {
          const key = entry[0];
          const value = entry[1];
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
            <Fragment key={key}>
              <label className="highlight" htmlFor={key}>
                {key.replaceAll('_', ' ')}
              </label>
              <input
                type={key === 'card_expiration' ? 'date' : 'text'}
                name={key}
                id={key}
                placeholder={key.replaceAll('_', ' ')}
                value={value}
                required
                disabled={
                  billingShippingSame && billingDisabledOptions.includes(key) ? true : false
                }
                minLength={key === 'cvv' ? 3 : 1}
                maxLength={key === 'cvv' ? 4 : 50}
                onChange={handleChange}
              />
            </Fragment>
          );
        })}
        <div className="button-container">
          <button type="submit" className="form-btn-style proceed">
            Proceed To Confirmation
          </button>
        </div>
      </form>
      <div className="up-next banner foot">Up next: Confirmation</div>
    </section>
  );
}

export default Billing;
