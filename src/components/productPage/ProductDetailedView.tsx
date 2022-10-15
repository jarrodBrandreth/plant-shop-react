import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import LikeButton from '../likeButton/LikeButton';
import Rating from '../rating/Rating';
import { ReactComponent as SunIcon } from '../../assets/icons/sunny-outline.svg';
import { ReactComponent as SunIconFill } from '../../assets/icons/sunny-sharp.svg';
import { ReactComponent as DropletIcon } from '../../assets/icons/water-outline.svg';
import { ReactComponent as DropletIconFill } from '../../assets/icons/water-sharp.svg';
import { ReactComponent as MaintenanceIcon } from '../../assets/icons/cut-outline.svg';
import { ReactComponent as MaintenanceIconFill } from '../../assets/icons/cut-sharp.svg';
import { ReactComponent as AddToBagIcon } from '../../assets/icons/bag-add-outline.svg';
import { formatCurrency } from '../../currencyFunction';
import { ProductAsProps } from '../../types/Types';
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
            <Rating
              Icon={SunIcon}
              IconFilled={SunIconFill}
              number={product.sun}
              width="24px"
              fill="#FABD02"
            />
          </div>
          <div className="field-container">
            <span className="title">Water Needs:</span>
            <Rating
              Icon={DropletIcon}
              IconFilled={DropletIconFill}
              number={product.water}
              width="24px"
              fill="#1F456E"
            />
          </div>
          <div className="field-container">
            <span className="title">Maintenance:</span>
            <Rating
              Icon={MaintenanceIcon}
              IconFilled={MaintenanceIconFill}
              number={product.maintenance}
              width="24px"
              fill="#3D251E"
            />
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
        <button onClick={() => cart.addToCart(product)} className="btn-style add-with-icon">
          <AddToBagIcon className="icon" width="22px" />
          Add To Bag
        </button>
      </section>
    </div>
  );
}

export default ProductDetailedView;
