import React from 'react';
import { ReactComponent as SunIcon } from '../../assets/icons/sunny-outline.svg';
import { ReactComponent as SunIconFill } from '../../assets/icons/sunny-sharp.svg';

interface SunRatingProps {
  number: number;
  width: string;
}

function SunRating({ number, width }: SunRatingProps) {
  const array = [1, 2, 3, 4, 5];

  return (
    <div className="sun-rating">
      {array.map((x, index) => {
        if (x > number) return <SunIcon key={index} width={width} color="#9A9A9A" />;
        return <SunIconFill key={index} width={width} fill="#FABD02" />;
      })}
    </div>
  );
}

export default SunRating;
