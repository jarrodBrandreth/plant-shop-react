import React, { ChangeEvent, SyntheticEvent, SetStateAction, Dispatch } from 'react';
import { useCheckOutContext } from '../../context/CheckOutContext';

interface ShippingProps {
  setShippingIsValid: Dispatch<SetStateAction<boolean>>;
}

function Shipping({ setShippingIsValid }: ShippingProps) {
  const { shippingForm, setShippingForm } = useCheckOutContext();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setShippingIsValid(true);
    console.log('submitted');
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm((shippingForm) => ({
      ...shippingForm,
      [name]: value,
    }));
  };

  return (
    <div>
      <form className="checkout-grid shipping" onSubmit={handleSubmit}>
        <h3 className="form-header">Shipping</h3>
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          placeholder="first name"
          value={shippingForm.firstName}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="last-name"
          placeholder="last name"
          value={shippingForm.lastName}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="address"
          value={shippingForm.address}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          id="city"
          required
          placeholder="city"
          value={shippingForm.city}
          // pattern='^[a-zA-Z]+$'
          onChange={handleChange}
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          name="state"
          id="state"
          required
          placeholder="state"
          value={shippingForm.state}
          // pattern='^[a-zA-Z]+$'
          onChange={handleChange}
        />
        <label htmlFor="postal-code">Postal Code:</label>
        <input
          type="text"
          name="postalCode"
          id="postal-code"
          placeholder="postal code"
          value={shippingForm.postalCode}
          // pattern='^[0-9]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          value={shippingForm.email}
          // pattern='^[a-zA-Z]+$'
          required
          onChange={handleChange}
        />
        <label htmlFor="phone-number">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          id="phone-number"
          placeholder="phone number"
          value={shippingForm.phoneNumber}
          // pattern='^[0-9]+$'
          required
          onChange={handleChange}
        />
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
