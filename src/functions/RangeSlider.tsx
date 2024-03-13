import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/brands_and_footer.module.scss";

const RangeSlider = ({ fetchProductsAndLog, brand, products }: any) => {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number | string>(0);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const maxPrice = Math.max(...products.map((product: any) => product.price));
      setMaxValue(maxPrice);
    }
  }, []);

  console.log(maxValue)
  
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(value);
    console.log("changing");
    fetchProductsAndLog({
      limit: 10,
      offset: 0,
      min_price: value,
      max_price: maxValue === "" ? 10000 : parseInt(maxValue as string),
      brand: brand?.id,
      product_color: [],
      memory: [],
    });
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setMaxValue(() => {
      fetchProductsAndLog({
        limit: 10,
        offset: 0,
        min_price: minValue,
        max_price: value === "" ? 10000 : parseInt(value),
        brand: brand?.id,
        product_color: [],
        memory: [],
      });

      return value;
    });
  };

  useEffect(() => {
    if (progressRef.current) {
      const progressWidth = ((minValue / (maxValue as number || 10000)) * 100) + "%";
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
            style={{ marginRight: "20px" }}
          />
        </div>
        <div className={styles.field}>
          <span>Max</span>
          <input
            type="number"
            className={styles.input_min}
            placeholder="Max"
            value={maxValue}
            onChange={handleMaxInputChange}
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
          max={maxValue as number}
          value={minValue}
          step={100}
          onChange={(e) => setMinValue(parseInt(e.target.value))}
        />
        <input
          type="range"
          className={styles.range_max}
          min={0}
          max={maxValue as number}
          value={maxValue === "" ? 10000 : parseInt(maxValue as string)}
          step={100}
          onChange={handleMaxInputChange}
        />
      </div>
    </div>
  );
};

export default RangeSlider;