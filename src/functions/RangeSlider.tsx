import React, { useState, useEffect } from "react";

const RangeSlider = ({ fetchProductsAndLog, brand, products }) => {
  const [range, setRange] = useState({ min: 0, max: 100000 });

  useEffect(() => {
    fetchProductsAndLog({
      min_price: range.min,
      max_price: range.max,
      brand: brand?.id, 
    });
  }, [range, brand, fetchProductsAndLog]);

  const handleInputChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    setRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
  };

  const handleRangeChange = (e, type) => {
    const value = parseInt(e.target.value, 10);
    setRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
  };

  useEffect(() => {
    if (range.min > range.max) {
      setRange((prevRange) => ({
        min: prevRange.max,
        max: prevRange.max,
      }));
    }
  }, [range.min, range.max]);

  return (
    <div className="wrapper">
      <div className="price-input">
        <div className="field">
          <input
            type="number"
            className="input-min"
            value={range.min}
            onChange={(e) => handleInputChange(e, "min")}
          />
        </div>
        <div className="seperator">-</div>
        <div className="field">
          <input
            type="number"
            className="input-max"
            value={range.max}
            onChange={(e) => handleInputChange(e, "max")}
          />
        </div>
      </div>
      <div className="slider">
        <div
          className="progress"
          style={{
            left: `${(range.min / 10000) * 100}%`,
            right: `${100 - (range.max / 10000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="10000"
          value={range.min}
          step="100"
          onChange={(e) => handleRangeChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="10000"
          value={range.max}
          step="100"
          onChange={(e) => handleRangeChange(e, "max")}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
