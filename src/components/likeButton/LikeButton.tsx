import React, { useState, useEffect } from 'react';
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
  const [liked, setLiked] = useState<boolean>();

  useEffect(() => {
    const contains = likedItems.find((item) => item.id === product.id) !== undefined;
    setLiked(contains);
  }, [likedItems, product]);

  return (
    <button className="like-btn" onClick={() => updateLikedItems(product)}>
      {liked ? <HeartFill fill="palevioletred" width={width} /> : <Heart width={width} />}
    </button>
  );
}

export default LikeButton;
