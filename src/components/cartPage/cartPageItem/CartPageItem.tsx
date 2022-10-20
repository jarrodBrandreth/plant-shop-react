import { Link } from 'react-router-dom';
import { CartProductProps } from '../../../types/Types';
import QuantityActions from '../quantityActions/QuantityActions';
import { formatCurrency } from '../../../currencyFunction';
import './cartPageItem.css';

interface CartPageItemProps {
  item: CartProductProps;
}

function CartPageItem({ item }: CartPageItemProps) {
  return (
    <div className="cart-page-item">
      <h4 className="name">{item.product.name}</h4>
      <Link className="image-link" to={`/shop/${item.product.id}`}>
        <img className="image" src={item.product.image} alt={item.product.name} />
      </Link>
      <div className="price">{formatCurrency(item.product.price)}</div>
      <QuantityActions item={item} />
      <div className="total-price">
        <span className="text">Total: </span> {formatCurrency(item.product.price * item.quantity)}
      </div>
    </div>
  );
}

export default CartPageItem;
