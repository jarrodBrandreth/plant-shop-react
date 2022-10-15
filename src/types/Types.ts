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

export interface ShippingFormProps {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  email: string;
  phone_number: string;
}

export interface CostProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export interface OrderProductsProps {
  id: number;
  name: string;
  quantity: number;
  image: string;
}

export interface IsValidProps {
  shipping: boolean;
  billing: boolean;
  confirmed: boolean;
}

export interface FinalOrderProps {
  order_number: string;
  order_products: OrderProductsProps[];
  store_pick_up: boolean;
  shipping?: ShippingFormProps;
  billing: BillingFormProps;
  cost: CostProps;
}

export type SvgComponentAsProps = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;
