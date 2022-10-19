import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { useGlobalContext } from './GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import {
  OrderProductProps,
  FinalOrderProps,
  CostProps,
  ShippingFormProps,
  BillingFormProps,
} from '../types/Types';

interface CheckOutContextProps {
  order: FinalOrderProps | null;
  orderProducts: OrderProductProps[];
  cost: CostProps;
  storePickUp: boolean;
  setStorePickUp: Dispatch<SetStateAction<boolean>>;
  shippingForm: ShippingFormProps;
  setShippingForm: Dispatch<SetStateAction<ShippingFormProps>>;
  setBillingShippingSame: Dispatch<SetStateAction<boolean>>;
  billingForm: BillingFormProps;
  setBillingForm: Dispatch<SetStateAction<BillingFormProps>>;
  billingShippingSame: boolean;
  placeOrder: () => void;
}
type CheckOutProviderProps = { children: ReactNode };

const CheckOutContext = createContext<CheckOutContextProps | undefined>(undefined);

export function CheckOutProvider({ children }: CheckOutProviderProps) {
  const { cart, updateProductQty } = useGlobalContext();
  const [order, setOrder] = useState<FinalOrderProps | null>(null);
  const [storePickUp, setStorePickUp] = useState(false);
  const [billingShippingSame, setBillingShippingSame] = useState(true);
  const [orderProducts, setOrderProducts] = useState<Array<OrderProductProps>>([]);
  const [shippingForm, setShippingForm] = useState({
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    email: '',
    phone_number: '',
  });
  const [billingForm, setBillingForm] = useState({
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
  });
  const [cost, setCost] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    const taxRate = 0.15;
    const orderProductsArray = cart.items.map((currentProduct) => {
      return {
        id: currentProduct.product.id,
        name: currentProduct.product.name,
        image: currentProduct.product.image,
        quantity: currentProduct.quantity,
      };
    });
    setCost((cost) => ({
      ...cost,
      subtotal: cart.totalPrice,
      tax: cart.totalPrice * taxRate,
    }));
    setOrderProducts(orderProductsArray);
  }, [cart]);

  useEffect(() => {
    if (storePickUp) {
      setCost((cost) => ({
        ...cost,
        shipping: 0,
      }));
    } else {
      const shippingPrice = cart.totalProducts * 50;
      setCost((cost) => ({
        ...cost,
        shipping: shippingPrice,
      }));
    }
  }, [storePickUp, cart.totalProducts]);

  useEffect(() => {
    setCost((cost) => ({
      ...cost,
      total: cost.subtotal + cost.tax + cost.shipping,
    }));
  }, [cost.subtotal, cost.tax, cost.shipping]);

  useEffect(() => {
    if (billingShippingSame) {
      setBillingForm((billingForm) => ({
        ...billingForm,
        name_on_card: `${shippingForm.first_name} ${shippingForm.last_name}`,
        address: shippingForm.address,
        city: shippingForm.city,
        state: shippingForm.state,
        postal_code: shippingForm.postal_code,
        email: shippingForm.email,
        phone_number: shippingForm.phone_number,
      }));
    }
  }, [billingShippingSame, shippingForm]);

  const placeOrder = () => {
    if (storePickUp) {
      setOrder({
        order_number: uuidv4(),
        order_products: orderProducts,
        store_pick_up: storePickUp,
        billing: billingForm,
        cost: cost,
      });
    }
    setOrder({
      order_number: uuidv4(),
      order_products: orderProducts,
      store_pick_up: storePickUp,
      shipping: shippingForm,
      billing: billingForm,
      cost: cost,
    });
    updateProductQty(orderProducts);
    cart.clearCart();
  };

  const value: CheckOutContextProps = {
    order,
    orderProducts,
    cost,
    storePickUp,
    setStorePickUp,
    shippingForm,
    setShippingForm,
    setBillingShippingSame,
    billingForm,
    setBillingForm,
    billingShippingSame,
    placeOrder,
  };

  return <CheckOutContext.Provider value={value}>{children}</CheckOutContext.Provider>;
}

export function useCheckOutContext() {
  const context = useContext(CheckOutContext);
  if (context === undefined) {
    throw new Error('useCheckOutContext must be used within a CheckOut Provider');
  }
  return context;
}
