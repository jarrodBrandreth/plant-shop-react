import React, {
  useEffect,
  useState,
  ChangeEvent,
  SyntheticEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';

interface BillingProps {
  setBillingIsValid: Dispatch<SetStateAction<boolean>>;
  setShippingIsValid: Dispatch<SetStateAction<boolean>>;
}

function Billing({ setBillingIsValid, setShippingIsValid }: BillingProps) {
  const { orderForm, setOrderForm } = useCheckOutContext();
  const [billingShippingSame, setBillingShippingSame] = useState(true);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setBillingIsValid(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm((orderForm) => ({
      ...orderForm,
      billing: {
        ...orderForm.billing,
        [name]: value,
      },
    }));
  };

  const handleBillingSameAsShippingChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'yes') setBillingShippingSame(true);
    if (e.target.value === 'no') setBillingShippingSame(false);
  };

  useEffect(() => {
    if (billingShippingSame) {
      setOrderForm((orderForm) => ({
        ...orderForm,
        billing: {
          ...orderForm.billing,
          name_on_card: `${orderForm.shipping.first_name} ${orderForm.shipping.last_name}`,
          address: orderForm.shipping.address,
          city: orderForm.shipping.city,
          state: orderForm.shipping.state,
          postal_code: orderForm.shipping.postal_code,
          email: orderForm.shipping.email,
          phone_number: orderForm.shipping.phone_number,
        },
      }));
    } else {
      setOrderForm((orderForm) => ({
        ...orderForm,
        billing: {
          ...orderForm.billing,
          name_on_card: '',
          address: '',
          city: '',
          state: '',
          postal_code: '',
          email: '',
          phone_number: '',
        },
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
          name="name_on_card"
          id="name-on-card"
          placeholder="name as appears on card"
          value={orderForm.billing.name_on_card}
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
          value={orderForm.billing.address}
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
          value={orderForm.billing.city}
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
          value={orderForm.billing.state}
          // pattern='^[a-zA-Z]+$'
          onChange={handleChange}
        />
        <label htmlFor="card-postal-code">Postal Code:</label>
        <input
          type="text"
          name="postal_code"
          id="card-postal-code"
          placeholder="postal code"
          value={orderForm.billing.postal_code}
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
          value={orderForm.billing.email}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="card-phone-number">Phone Number:</label>
        <input
          type="text"
          name="phone_number"
          id="card-phone-number"
          placeholder="phone number"
          value={orderForm.billing.phone_number}
          // pattern='^[0-9]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="card-number">Card Number:</label>
        <input
          type="text"
          name="card_number"
          id="card-number"
          placeholder="card number"
          value={orderForm.billing.card_number}
          // pattern=""
          required
          onChange={handleChange}
        />
        <label htmlFor="card-expiration">Card Expiration:</label>
        <input
          type="date"
          name="card_expiration"
          id="card-expiration"
          placeholder="card expiration"
          value={orderForm.billing.card_expiration}
          // pattern=""
          required
          onChange={handleChange}
        />
        <label htmlFor="card-cvv">CVV:</label>
        <input
          type="text"
          name="cvv"
          id="card-cvv"
          minLength={3}
          maxLength={4}
          required
          placeholder="cvv"
          value={orderForm.billing.cvv}
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
