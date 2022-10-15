import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ReactComponent as AddToBagIcon } from '../../assets/icons/bag-add-outline.svg';
import { ProductProps } from '../../types/Types';

interface AddToBagIconButtonProps {
  product: ProductProps;
  width: string;
}

function AddToBagIconButton({ product, width }: AddToBagIconButtonProps) {
  const { cart } = useGlobalContext();

  return (
    <button className="add-to-bag-btn" onClick={() => cart.addToCart(product)}>
      <AddToBagIcon width={width} />
    </button>
  );
}

export default AddToBagIconButton;
