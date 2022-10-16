import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ProductProps, SvgComponentAsProps } from '../../types/Types';

interface AddToBagProps {
  Icon: SvgComponentAsProps;
  product: ProductProps;
  text: string | null;
  iconWidth: string;
  className: string;
}

function AddToCartButton({ Icon, product, text, iconWidth, className }: AddToBagProps) {
  const { cart } = useGlobalContext();
  const itemInCart = cart.items.find((item) => item.product.id === product.id);
  const haveStock = !itemInCart && product.quantity > 0;
  const haveQuantity = itemInCart && itemInCart.quantity < product.quantity;

  return (
    <button
      className={className}
      onClick={() => cart.addToCart(product)}
      disabled={haveStock || haveQuantity ? false : true}
    >
      <Icon className="icon" width={iconWidth} />
      {text && `${text}`}
    </button>
  );
}

export default AddToCartButton;
