import React, { useState, Dispatch, SetStateAction, Fragment, useEffect } from 'react';
import { ReactComponent as ChevronUp } from '../../assets/icons/chevron-up-outline.svg';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down-outline.svg';
import { ReactComponent as Clear } from '../../assets/icons/close-outline.svg';
import { ProductProps } from '../../types/Types';
import './accordionSort.css';

interface SortProductsArgs {
  property: keyof ProductProps;
  decreasing: boolean;
}
interface AccordionSortProps {
  options: { property: keyof ProductProps; type: string }[];
  sortByValue: SortProductsArgs | null;
  setSortByValue: Dispatch<SetStateAction<null | SortProductsArgs>>;
}

function AccordionSort({ sortByValue, setSortByValue, options }: AccordionSortProps) {
  const [toggle, setToggle] = useState(false);
  const [currentOption, setCurrentOption] = useState<null | string>(null);

  useEffect(() => {
    if (!sortByValue) return setCurrentOption(null);
    let property: string;
    let num: string;
    let str: string;
    property = sortByValue.property;
    num = `${sortByValue.decreasing ? 'high to low' : 'low to high'}`;
    str = `${sortByValue.decreasing ? 'Z - A' : 'A - Z'}`;
    setCurrentOption(`${property} ${property === 'name' ? str : num}`);
  }, [sortByValue]);

  const currentOptionElement = (
    <div className="current-sorted">
      <span className="current-option">{currentOption}</span>
      <button
        className="clear-sort"
        onClick={() => {
          setToggle(false);
          setSortByValue(null);
        }}
        aria-label="reset sort to default"
      >
        <Clear width="16px" color="black" />
      </button>
    </div>
  );

  return (
    <div className="accordion">
      <div className={`title-wrapper ${toggle ? 'open' : ''}`}>
        <button onClick={() => setToggle((toggle) => !toggle)}>
          <span className="title">Sort By</span>
          {toggle ? <ChevronUp width="18px" /> : <ChevronDown width="18px" />}
        </button>
        {currentOption && currentOptionElement}
      </div>
      <div className="options-container">
        <div className={`options ${toggle ? 'open' : ''}`}>
          {options.map((option, index) => {
            return (
              <Fragment key={index}>
                <button
                  onClick={() => {
                    setToggle(false);
                    setSortByValue({ property: option.property, decreasing: false });
                  }}
                >
                  {`${option.property} ${option.type === 'number' ? 'low to high' : 'A-Z'}`}
                </button>
                <button
                  onClick={() => {
                    setToggle(false);
                    setSortByValue({ property: option.property, decreasing: true });
                  }}
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
