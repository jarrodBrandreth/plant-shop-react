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

// export interface BillingFormProps {
//   nameOnCard: string;
//   address: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   email: string;
//   phoneNumber: string;
//   cardNumber: string;
//   cardExpiration: string;
//   cardCVV: string;
// }

// export interface ShippingFormProps {
//   firstName: string;
//   lastName: string;
//   address: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   email: string;
//   phoneNumber: string;
// }

export interface OrderFormProps {
  shipping: {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    email: string;
    phone_number: string;
  },
  billing: {
    name_on_card: string;
    address: string;
    city: string;
    state: string;
    postal_code: string;
    email: string;
    phone_number: string;
    card_number: string;
    card_expiration: string;
    cvv: string;
  }
}