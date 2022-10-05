import React from 'react';
import { ReactComponent as DropletIcon } from '../../assets/icons/water-outline.svg';
import { ReactComponent as DropletIconFill } from '../../assets/icons/water-sharp.svg';

interface WaterRatingProps {
  number: number;
  width: string;
}

function WaterRating({ number, width }: WaterRatingProps) {
  const array = [1, 2, 3, 4, 5];

  return (
    <div className="water-rating">
      {array.map((x, index) => {
        if (x > number) return <DropletIcon key={index} width={width} color="#9A9A9A" />;
        return <DropletIconFill key={index} width={width} fill="#1F456E" />;
      })}
    </div>
  );
}

export default WaterRating;
