import React, { useState, useEffect } from "react";
import styles from "../styles/brands_and_footer.module.scss";

const RangeSlider = ({ fetchProductsAndLog, brand, products }: any) => {
  const [range, setRange] = useState<[number, number]>([0, 1000]);

  useEffect(() => {
    if (products && products.length > 0) {
      const maxPrice = Math.max(...products.map((product: any) => product.price));
      setRange([0, maxPrice]);
    }
  }, [products]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    setRange(prevRange => {
      const newRange = [...prevRange];
      newRange[index] = newValue;
      return newRange;
    });
  };

  useEffect(() => {
    fetchProductsAndLog({
      limit: 10,
      offset: 0,
      min_price: range[0],
      max_price: range[1],
      brand: brand?.id,
      product_color: [],
      memory: [],
    });
  }, [range, brand, fetchProductsAndLog]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.price_input}>
        <div className={styles.field}>
          <span>Min</span>
          <input
            type="number"
            className={styles.input_min}
            value={range[0]}
            onChange={(e) => handleRangeChange(e, 0)}
            style={{ marginRight: "20px" }}
          />
        </div>
        <div className={styles.field}>
          <span>Max</span>
          <input
            type="number"
            className={styles.input_min}
            placeholder="Max"
            value={range[1]}
            onChange={(e) => handleRangeChange(e, 1)}
          />
        </div>
      </div>
      <div className={styles.slider}>
        <div className={styles.progress} style={{width: `${(range[0] / 1000) * 100}%`}}></div>
      </div>
      <div className={styles.range_input}>
        <input
          type="range"
          className={styles.range_min}
          min={0}
          max={1000}
          value={range[0]}
          onChange={(e) => handleRangeChange(e, 0)}
        />
        <input
          type="range"
          className={styles.range_max}
          min={0}
          max={1000}
          value={range[1]}
          onChange={(e) => handleRangeChange(e, 1)}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
