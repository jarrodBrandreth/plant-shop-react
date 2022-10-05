import { useGlobalContext } from '../../context/GlobalContext';
import { CartProductProps } from '../../types/Types';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-outline.svg';
import { ReactComponent as PlusCircle } from '../../assets/icons/add-circle-outline.svg';
import { ReactComponent as MinusCircle } from '../../assets/icons/remove-circle-outline.svg';
import { formatCurrency } from '../../currencyFunction';
import './cartPageItem.css';

interface CartPageItemProps {
  item: CartProductProps;
}

function CartPageItem({ item }: CartPageItemProps) {
  const { cart } = useGlobalContext()
  return (
    <div className="cart-page-item">
      <h4 className="name">{item.product.name}</h4>
      <img className="image" src={item.product.image} alt={item.product.name} />
      <div className="price">{formatCurrency(item.product.price)}</div>
      <div className="quantity">
        <button className="increase" onClick={() => cart.addToCart(item.product)}>
          <PlusCircle width="20px" />
        </button>
        <span className="number">{item.quantity}</span>
        <button className="decrease" onClick={() => cart.removeByQuantity(item.product.id)}>
          <MinusCircle width="20px" />
        </button>
        <button className="trash" onClick={() => cart.removeItemFromCart(item.product.id)}>
          <TrashIcon width="20px" />
          </button>
      </div>
      <div className="total-price"><span className='text'>Total: </span> {formatCurrency(item.product.price * item.quantity)}</div>
    </div>
  );
}

export default CartPageItem;
