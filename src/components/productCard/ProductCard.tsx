import React from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../likeButton/LikeButton';
import AddToBagIconButton from './AddToBagIconButton';
import SunRating from '../sunRating/SunRating';
import MaintenanceRating from '../maintenanceRating/MaintenanceRating';
import WaterRating from '../waterRating/WaterRating';
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
          <SunRating number={product.sun} width="18px" />
          <WaterRating number={product.water} width="18px" />
          <MaintenanceRating number={product.maintenance} width="18px" />
        </div>
      </Link>
      <AddToBagIconButton product={product} width="22px" />
      <LikeButton product={product} width="22px" />
    </div>
  );
}

export default ProductCard;
