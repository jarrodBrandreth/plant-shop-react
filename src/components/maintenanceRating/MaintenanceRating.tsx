import React from 'react';
import { ReactComponent as MaintenanceIcon } from '../../assets/icons/cut-outline.svg';
import { ReactComponent as MaintenanceIconFill } from '../../assets/icons/cut-sharp.svg';

interface MaintenanceRatingProps {
  number: number;
  width: string;
}

function MaintenanceRating({ number, width }: MaintenanceRatingProps) {
  const array = [1, 2, 3, 4, 5];

  return (
    <div className="maintenance-rating">
      {array.map((x, index) => {
        if (x > number) return <MaintenanceIcon key={index} width={width} color="#9A9A9A" />;
        return <MaintenanceIconFill key={index} width={width} fill="#3D251E" />;
      })}
    </div>
  );
}

export default MaintenanceRating;
