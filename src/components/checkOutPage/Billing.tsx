import React, { useEffect, ChangeEvent, SyntheticEvent, SetStateAction, Dispatch } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';

interface BillingProps {
  setBillingIsValid: Dispatch<SetStateAction<boolean>>;
  setShippingIsValid: Dispatch<SetStateAction<boolean>>;
  billingShippingSame: boolean;
  setBillingShippingSame: Dispatch<SetStateAction<boolean>>;
}

function Billing({setBillingIsValid,setShippingIsValid,billingShippingSame,setBillingShippingSame}: BillingProps) {
  const { billingForm, setBillingForm, shippingForm } = useCheckOutContext();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setBillingIsValid(true);
    console.log('submitted');
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
    if (e.target.value === 'no') setBillingShippingSame(false);
  };

  useEffect(() => {
    if (billingShippingSame) {
      setBillingForm((billingForm) => ({
        ...billingForm,
        nameOnCard: `${shippingForm.firstName} ${shippingForm.lastName}`,
        address: shippingForm.address,
        city: shippingForm.city,
        state: shippingForm.state,
        postalCode: shippingForm.postalCode,
        email: shippingForm.email,
        phoneNumber: shippingForm.phoneNumber,
      }));
    }
  }, [billingShippingSame]);

  return (
    <div>
      <form className="checkout-grid billing" onSubmit={handleSubmit}>
        <h3 className="form-header">Billing</h3>
        <div className="button-container top">
          <button type="button" className="previous" onClick={() => setShippingIsValid(false)}>
            Back To Shipping
          </button>
        </div>
        <div className="billing-shipping-same-radio">
          <div className="title">Billing same as shipping</div>
          <div className="choices">
            <div className="choice-yes">
              <input
                type="radio"
                id="yes-same"
                name="billingShippingSame"
                value="yes"
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
                checked={billingShippingSame === false}
                onChange={handleBillingSameAsShippingChange}
              />
              <label htmlFor="no-same">No</label>
            </div>
          </div>
        </div>
        <label htmlFor="name-on-card">Name:</label>
        <input
          type="text"
          name="nameOnCard"
          id="name-on-card"
          placeholder="name as appears on card"
          value={billingForm.nameOnCard}
          // pattern=""
          required
          onChange={handleChange}
        />
        <label htmlFor="card-address">Address:</label>
        <input
          type="text"
          name="address"
          id="card-address"
          placeholder="address"
          value={billingForm.address}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="card-city">City:</label>
        <input
          type="text"
          name="city"
          id="card-city"
          required
          placeholder="city"
          value={billingForm.city}
          // pattern='^[a-zA-Z]+$'
          onChange={handleChange}
        />
        <label htmlFor="card-state">State:</label>
        <input
          type="text"
          name="state"
          id="card-state"
          required
          placeholder="state"
          value={billingForm.state}
          // pattern='^[a-zA-Z]+$'
          onChange={handleChange}
        />
        <label htmlFor="card-postal-code">Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          id="card-postal-code"
          placeholder="postal code"
          value={billingForm.postalCode}
          // pattern='^[0-9]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="card-email">Email:</label>
        <input
          type="text"
          name="email"
          id="card-email"
          placeholder="email"
          value={billingForm.email}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="card-phone-number">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="card-phone-number"
          placeholder="phone number"
          value={billingForm.phoneNumber}
          // pattern='^[0-9]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="card-number">Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          id="card-number"
          placeholder="card number"
          value={billingForm.cardNumber}
          // pattern=""
          required
          onChange={handleChange}
        />
        <label htmlFor="card-expiration">Card Expiration:</label>
        <input
          type="date"
          name="cardExpiration"
          id="card-expiration"
          placeholder="card expiration"
          value={billingForm.cardExpiration}
          // pattern=""
          required
          onChange={handleChange}
        />
        <label htmlFor="card-cvv">CVV:</label>
        <input
          type="text"
          name="cardCVV"
          id="card-cvv"
          minLength={3}
          maxLength={4}
          required
          placeholder="cvv"
          value={billingForm.cardCVV}
          // pattern=""
          onChange={handleChange}
        />
        <div className="button-container">
          <button type="submit" className="proceed">
            Proceed To Confirmation
          </button>
        </div>
        <div className="up-next form-footer">Up next: Confirmation</div>
      </form>
    </div>
  );
}

export default Billing;
