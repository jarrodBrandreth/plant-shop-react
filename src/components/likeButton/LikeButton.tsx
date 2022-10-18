import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import { ProductProps } from '../../types/Types';
import { ReactComponent as Heart } from '../../assets/icons/heart-outline.svg';
import { ReactComponent as HeartFill } from '../../assets/icons/heart-sharp.svg';
import './likeButton.css';

interface LikeButtonProps {
  product: ProductProps;
  width: string;
}

function LikeButton({ product, width }: LikeButtonProps) {
  const { updateLikedItems, likedItems } = useGlobalContext();
  const isLiked = likedItems.find((item) => item.id === product.id) !== undefined;

  return (
    <button className="like-btn" onClick={() => updateLikedItems(product)}>
      {isLiked ? <HeartFill fill="palevioletred" width={width} /> : <Heart width={width} />}
    </button>
  );
}

export default LikeButton;
