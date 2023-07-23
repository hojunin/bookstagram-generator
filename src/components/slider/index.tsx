import React from 'react';
import './index.css';

const Slider = ({ value = 32, setValue }) => {
  return (
    <div className="PB-range-slider-div">
      <input
        type="range"
        min="16"
        max="32"
        value={value}
        className="PB-range-slider"
        id="myRange"
        onChange={setValue}
      />
      <p className="PB-range-slidervalue">{`${value}px`}</p>
    </div>
  );
};

export default Slider;
