import React from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../likeButton/LikeButton';
import AddToBagIconButton from './AddToBagIconButton';
import Rating from '../rating/Rating';
import { ReactComponent as SunIcon } from '../../assets/icons/sunny-outline.svg';
import { ReactComponent as SunIconFill } from '../../assets/icons/sunny-sharp.svg';
import { ReactComponent as DropletIcon } from '../../assets/icons/water-outline.svg';
import { ReactComponent as DropletIconFill } from '../../assets/icons/water-sharp.svg';
import { ReactComponent as MaintenanceIcon } from '../../assets/icons/cut-outline.svg';
import { ReactComponent as MaintenanceIconFill } from '../../assets/icons/cut-sharp.svg';
import { ProductProps } from '../../types/Types';
import { formatCurrency } from '../../currencyFunction';
import './productCard.css';

interface ProductCardProps {
  product: ProductProps;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <h3 style={{ display: 'none' }}>{product.name}</h3>
      <Link to={`/shop/${product.id}`}>
        <div className="details">
          <img src={product.image} alt={product.name} />
          <span className="name">{product.name}</span>
          <span className="price">{formatCurrency(product.price)}</span>
          <Rating
            Icon={SunIcon}
            IconFilled={SunIconFill}
            number={product.sun}
            width="20px"
            fill="#FABD02"
          />
          <Rating
            Icon={DropletIcon}
            IconFilled={DropletIconFill}
            number={product.water}
            width="20px"
            fill="#1F456E"
          />
          <Rating
            Icon={MaintenanceIcon}
            IconFilled={MaintenanceIconFill}
            number={product.maintenance}
            width="20px"
            fill="#3D251E"
          />
        </div>
      </Link>
      <AddToBagIconButton product={product} width="22px" />
      <LikeButton product={product} width="22px" />
    </div>
  );
}

export default ProductCard;
