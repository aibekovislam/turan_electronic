import { useState, useEffect, ChangeEvent } from "react";
import { Props, Range } from "../utils/interfacesAndTypes";
import { getHighestPrice } from "./filterFunction";

const RangeSlider = ({ style ,fetchProductsAndLog, brand, products }: Props) => {
  const maxPrice = getHighestPrice(products);

  const [range, setRange] = useState<Range>({ min: 0, max: maxPrice });

  useEffect(() => {
    fetchProductsAndLog({
      min_price: range.min,
      max_price: range.max,
      brand: brand?.id || '', 
    });
  }, [range]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: keyof Range) => {
    const value = parseInt(e.target.value, 10);
    setRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
  };
  
  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>, type: keyof Range) => {
    const value = parseInt(e.target.value, 10);
    if (value !== range[type]) {
      setRange((prevRange) => ({
        ...prevRange,
        [type]: value,
      }));
    }
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
    <div className="wrapper" style={style}>
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
            left: `${(range.min / maxPrice) * 100}%`,
            right: `${100 - (range.max / maxPrice) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max={maxPrice.toString()}
          value={range.min}
          step="100"
          onChange={(e) => handleRangeChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max={maxPrice.toString()}
          value={range.max}
          step="100"
          onChange={(e) => handleRangeChange(e, "max")}
        />
      </div>
    </div>
  );
};

export default RangeSlider;