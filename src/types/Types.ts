export interface ProductProps {
  id: number;
  price: number;
  name: string;
  category: string[];
  maintenance: number;
  water: number;
  sun: number;
  image: string;
  quantity: number;
}

export interface ProductAsProps {
  product: ProductProps;
}

export interface CartProductProps {
  product: ProductProps;
  quantity: number;
}

export interface BillingFormProps {
  nameOnCard: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  cardExpiration: string;
  cardCVV: string;
}

export interface ShippingFormProps {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}
