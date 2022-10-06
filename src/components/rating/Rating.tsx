import React from 'react';
import { SvgComponentAsProps } from '../../types/Types';

interface RatingProps {
  number: number;
  width: string;
  Icon: SvgComponentAsProps;
  IconFilled: SvgComponentAsProps;
  fill: string;
}

function Rating({ Icon, IconFilled, fill, number, width }: RatingProps) {
  const array = [1, 2, 3, 4, 5];

  return (
    <div className="rating-container">
      {array.map((x, index) => {
        if (x > number) return <Icon key={index} width={width} color={'#9A9A9A'} />;
        return <IconFilled key={index} width={width} fill={fill} />;
      })}
    </div>
  );
}

export default Rating;
