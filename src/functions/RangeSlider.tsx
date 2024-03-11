import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/brands_and_footer.module.scss";

const RangeSlider: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(10000);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(value);
  };

  const handleRangeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(value);
  };

  useEffect(() => {
    if (progressRef.current) {
      const progressWidth = (((minValue - 0) / (10000 - 0)) * 100) + "%";
      progressRef.current.style.width = progressWidth;
    }

    const handleCleanup = () => {};

    return handleCleanup;
  }, [minValue, maxValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.price_input}>
        <div className={styles.field}>
          <span>Min</span>
          <input
            type="number"
            className={styles.input_min}
            value={minValue}
            onChange={handlePriceInputChange}
          />
        </div>
        <div className={styles.separator}>-</div>
        <div className={styles.field}>
          <span>Max</span>
          <input
            type="number"
            className={styles.input_min}
            value={maxValue}
            onChange={(e) => setMaxValue(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className={styles.slider}>
        <div className={styles.progress} ref={progressRef}></div>
      </div>
      <div className={styles.range_input}>
        <input
          type="range"
          className={styles.range_min}
          min={0}
          max={10000}
          value={minValue}
          step={100}
          onChange={handleRangeInputChange}
        />
        <input
          type="range"
          className={styles.range_max}
          min={0}
          max={10000}
          value={maxValue}
          step={100}
          onChange={(e) => setMaxValue(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default RangeSlider;