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
  const { checkIfLiked, updateLikedItems } = useGlobalContext();
  const isLiked = checkIfLiked(product);

  return (
    <button className="like-btn" onClick={() => updateLikedItems(product)}>
      {isLiked ? <HeartFill fill="palevioletred" width={width} /> : <Heart width={width} />}
    </button>
  );
}

export default LikeButton;
