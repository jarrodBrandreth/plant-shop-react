import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import LikeButton from '../likeButton/LikeButton';
import WaterRating from '../waterRating/WaterRating';
import MaintenanceRating from '../maintenanceRating/MaintenanceRating';
import SunRating from '../sunRating/SunRating';
import { ProductAsProps } from '../../types/Types';
import { formatCurrency } from '../../currencyFunction';
import './productDetailedView.css';

function ProductDetailedView({ product }: ProductAsProps) {
  const { cart } = useGlobalContext();
  return (
    <div className="product-detailed-view">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
        <LikeButton product={product} width="30px" />
      </div>
      <section className="info-container">
        <h3 className="heading">Plant Details</h3>
        <div className="details">
          <div className="field-container">
            <span className="title">Name:</span>
            <span className="description">{product.name}</span>
          </div>
          <div className="field-container">
            <span className="title">Price:</span>
            <span className="description">{formatCurrency(product.price)}</span>
          </div>
          <div className="field-container">
            <span className="title">Scientific Name:</span>
            <span className="description">lorem ipsom</span>
          </div>

          <div className="field-container">
            <span className="title">Sun Needs:</span>
            <SunRating number={product.sun} width="24px" />
          </div>
          <div className="field-container">
            <span className="title">Water Needs:</span>
            <WaterRating number={product.water} width="24px" />
          </div>
          <div className="field-container">
            <span className="title">Maintenance:</span>
            <MaintenanceRating number={product.maintenance} width="24px" />
          </div>

          <details className="drop-down">
            <summary className="title">Characteristics</summary>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error delectus obcaecati
              inventore porro? Rem, illo maiores. Dolorum enim aut quibusdam doloremque officiis
              consequuntur, veritatis iusto quia quisquam adipisci id ab.
            </p>
          </details>
          <details className="drop-down">
            <summary className="title">Care Instructions</summary>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nobis vero nostrum, id
              fugiat quasi omnis! Iste rem magnam nemo deleniti nostrum numquam, quis facere,
              dolorum libero quod corporis adipisci.
            </p>
          </details>
        </div>
        <div className="disclaimer">
          * All plants will be shipped with an appropriate pot for growing. Color may vary, pick up
          at our store location to get a pot of your choosing.
        </div>
        <button onClick={() => cart.addToCart(product)} className="btn-style">
          Add To Bag
        </button>
      </section>
    </div>
  );
}

export default ProductDetailedView;
