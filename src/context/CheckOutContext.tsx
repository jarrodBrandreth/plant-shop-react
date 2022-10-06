import { createContext, useContext, useState, SetStateAction, Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { OrderFormProps } from '../types/Types';

interface CheckOutContextProps {
  orderForm:OrderFormProps;
  setOrderForm:Dispatch<SetStateAction<OrderFormProps>>;
  order: any;
  setOrder: any;
}

const CheckOutContext = createContext<CheckOutContextProps | undefined>(undefined);

export function CheckOutProvider({ children }: any) {
  const [orderForm, setOrderForm] = useState({
    shipping: {
      first_name: '',
      last_name: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      email: '',
      phone_number: '',
    },
    billing: {
      name_on_card: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      email: '',
      phone_number: '',
      card_number: '',
      card_expiration: '',
      cvv: '',
    }
  });
  const [order, setOrder] = useState();

  const value: CheckOutContextProps = {
    orderForm,
    setOrderForm,
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
