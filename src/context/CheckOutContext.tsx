import { createContext, useContext, useState, SetStateAction, Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ShippingFormProps, BillingFormProps } from '../types/Types';

interface CheckOutContextProps {
  shippingForm: ShippingFormProps;
  setShippingForm: Dispatch<SetStateAction<ShippingFormProps>>;
  billingForm: BillingFormProps;
  setBillingForm: Dispatch<SetStateAction<BillingFormProps>>;
  order: any;
  setOrder: any;
}

const CheckOutContext = createContext<CheckOutContextProps | undefined>(undefined);

export function CheckOutProvider({ children }: any) {
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
  });
  const [billingForm, setBillingForm] = useState({
    nameOnCard: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    cardNumber: '',
    cardExpiration: '',
    cardCVV: '',
  });
  const [order, setOrder] = useState();

  const value: CheckOutContextProps = {
    shippingForm,
    setShippingForm,
    billingForm,
    setBillingForm,
    order,
    setOrder,
  };

  return <CheckOutContext.Provider value={value}>{children}</CheckOutContext.Provider>;
}

export function useCheckOutContext() {
  const context = useContext(CheckOutContext);
  if (context === undefined) {
    throw new Error('useCheckOutContext must be used within a Global Provider');
  }
  return context;
}
