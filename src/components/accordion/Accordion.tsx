import React, { useState } from 'react'
import { ReactComponent as ChevronUp } from '../../assets/icons/chevron-up-outline.svg';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down-outline.svg';
import './accordion.css';

interface AccordionProps {
  title: string;
  handlerFunction: ({ args }: any) => void;
  options: {
    functionArgs: {};
    innerText: string;
  }[];
}

function Accordion({ title, handlerFunction, options }: AccordionProps) {
  const [toggle, setToggle] = useState(false);
  // const changeToggle = () => {
  //   setToggle(!toggle);
  // };
  return (
    <div className="accordion">
    <div className={`title-wrapper ${toggle ? 'open' : ''}`}>
        {/* <button onClick={changeToggle}> */}
        <button onClick={()=> setToggle(toggle=>!toggle)}>
          <span className='title'>{title}</span>
          {toggle ? <ChevronUp width="18px" fill='crimson' /> :  <ChevronDown width="18px" />}
        </button>
    </div>
    <div className="options-container">
      <div className={`options ${toggle ? 'open' : ''}`}>
        {options.map((option,index) => {
          return (
            <button key={index} onClick={() => handlerFunction({ ...option.functionArgs })}>
              {option.innerText}
            </button>
          );
        })}
      </div>
    </div>
  </div>
  )
}

export default Accordion