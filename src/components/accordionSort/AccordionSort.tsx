import React, { useState, Dispatch, SetStateAction, Fragment } from 'react';
import { ReactComponent as ChevronUp } from '../../assets/icons/chevron-up-outline.svg';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down-outline.svg';
import { ProductProps } from '../../types/Types';
import './accordionSort.css';

interface SortProductsArgs {
  property: keyof ProductProps;
  decreasing: boolean;
}
interface AccordionSortProps {
  options: { property: keyof ProductProps; type: string }[];
  setSortByValue: Dispatch<SetStateAction<'default' | SortProductsArgs>>;
}

function AccordionSort({ setSortByValue, options }: AccordionSortProps) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="accordion">
      <div className={`title-wrapper ${toggle ? 'open' : ''}`}>
        <button onClick={() => setToggle((toggle) => !toggle)}>
          <span className="title">Sort By</span>
          {toggle ? <ChevronUp width="18px" /> : <ChevronDown width="18px" />}
        </button>
      </div>
      <div className="options-container">
        <div className={`options ${toggle ? 'open' : ''}`}>
          <button onClick={() => setSortByValue('default')}>default</button>
          {options.map((option, index) => {
            return (
              <Fragment key={index}>
                <button
                  onClick={() => setSortByValue({ property: option.property, decreasing: false })}
                >
                  {`${option.property} ${option.type === 'number' ? 'low to high' : 'A-Z'}`}
                </button>
                <button
                  onClick={() => setSortByValue({ property: option.property, decreasing: true })}
                >
                  {`${option.property} ${option.type === 'number' ? 'high to low' : 'Z-A'}`}
                </button>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AccordionSort;
