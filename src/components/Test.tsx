import React, { useState } from 'react';
import '../styles/main.scss';

const PriceRangeSlider: React.FC = () => {
  // const [minPrice, setMinPrice] = useState<number>(0);
  // const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [range, setRange] = useState<[number, number]>([0, 1000]);

  // const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newMin = parseInt(event.target.value);
  //   if (newMin <= maxPrice) {
  //     setMinPrice(newMin);
  //     setRange([newMin, maxPrice]);
  //   }
  // };

  // const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newMax = parseInt(event.target.value);
  //   if (newMax >= minPrice) {
  //     setMaxPrice(newMax);
  //     setRange([minPrice, newMax]);
  //   }
  // };

  return (
    <div className="price-range-slider">
      {/* <div className="price-inputs">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinChange}
        />
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxChange}
        />
      </div> */}
      <div className="price-display">
        <span>Min: ${range[0]}</span>
        <span>Max: ${range[1]}</span>
      </div>
      <div className="range-slider">
        <input
          type="range"
          min={0}
          max={1000}
          value={range[0]}
          onChange={(e) => setRange([parseInt(e.target.value), range[1]])}
        />
        <input
          type="range"
          min={0}
          max={1000}
          value={range[1]}
          onChange={(e) => setRange([range[0], parseInt(e.target.value)])}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
