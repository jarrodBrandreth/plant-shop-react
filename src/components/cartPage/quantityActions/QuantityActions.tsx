import React from 'react';
import { useGlobalContext } from '../../../context/GlobalContext';
import AddToCartButton from '../../addToCartButton/AddToCartButton';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash-outline.svg';
import { ReactComponent as PlusCircle } from '../../../assets/icons/add-circle-outline.svg';
import { ReactComponent as MinusCircle } from '../../../assets/icons/remove-circle-outline.svg';
import { CartProductProps } from '../../../types/Types';
import './quantityActions.css';

interface QuantityActionsProps {
  item: CartProductProps;
}

function QuantityActions({ item }: QuantityActionsProps) {
  const { cart } = useGlobalContext();
  return (
    <div className="quantity-actions">
      <AddToCartButton
        Icon={PlusCircle}
        product={item.product}
        text={null}
        iconWidth="20px"
        className="increase icon-as-button"
      />
      <span className="quantity">{item.quantity}</span>
      <button
        className="decrease icon-as-button"
        onClick={() => cart.removeByQuantity(item.product.id)}
      >
        <MinusCircle width="20px" />
      </button>
      <button
        className="trash icon-as-button"
        onClick={() => cart.removeItemFromCart(item.product.id)}
      >
        <TrashIcon width="20px" />
      </button>
    </div>
  );
}

export default QuantityActions;
