import { useState, useEffect, ChangeEvent } from "react";
import { Props, Range } from "../utils/interfacesAndTypes";
import { getHighestPrice } from "./filterFunction";

const RangeSlider = ({ style ,fetchProductsAndLog, brand, products }: Props) => {
  const maxPrice = getHighestPrice(products);

  const [range, setRange] = useState<Range>({ min: 0, max: maxPrice });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      fetchProductsAndLog({
        min_price: range.min,
        max_price: range.max,
        brand: brand?.id || '', 
      });
    }
  }, [range, isDragging]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: keyof Range) => {
    const value = parseInt(e.target.value, 10);
    setRange((prevRange) => ({
      ...prevRange,
      [type]: value,
    }));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (value: number, type: keyof Range) => {
    if (isDragging) {
      setRange((prevRange) => ({
        ...prevRange,
        [type]: value,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
            step="5000"
          />
        </div>
        <div className="seperator">-</div>
        <div className="field">
          <input
            type="number"
            className="input-max"
            value={range.max}
            onChange={(e) => handleInputChange(e, "max")}
            step="5000"
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
          step="5000"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onChange={(e) => handleMouseMove(parseInt(e.target.value, 10), "min")}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max={maxPrice.toString()}
          value={range.max}
          step="5000"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onChange={(e) => handleMouseMove(parseInt(e.target.value, 10), "max")}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default RangeSlider;