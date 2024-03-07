import { useEffect, useState } from 'react';
import styles from "../styles/cart.module.scss";
import rate from "../assets/svgs/card/star2:5.svg";
import phone from "../assets/sliderDetail/img01.png";

function CartCardList() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('cartCount');
    return savedCount ? Number(savedCount) : 1;
  }); // если count = 1 , то он не сохроняет в localStorage

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => prevCount > 1 ? prevCount - 1 : 1);
  };

  useEffect(() => {
    localStorage.setItem('cartCount', String(count));
  }, [count]);

  return (
    <div className={styles.cart_main}>
        <div className={styles.cart_path}>
            <span>Главная | Каталог | Корзина</span>
        </div>
        <div className={styles.cart_header}>
            <div>Корзина</div>
            <span>удалить все</span>
        </div>
        <div className={styles.cart_container}>
            <div className={styles.cart}>
                <div className={styles.cart_image}>
                    <img src={phone} alt="phone" />
                </div>
                <div className={styles.cart_content}>
                    <p>Смартфон Apple Iphone 14 Pro max 256GB</p>
                    <div className={styles.cart_counter}>
                      <button onClick={decrementCount}>-</button>
                      <span>{count}</span>
                      <button onClick={incrementCount}>+</button>
                    </div>
                </div>
                <div className={styles.cart_price}>
                    <div className={styles.discount_price}>{count * 74500} с</div>
                    <div className={styles.default_price}>{count * 81000 } c</div>
                </div>
                <div className={styles.cart_rate}>
                    <img src={rate} alt="rate" />
                </div>
            </div>
        </div>
        <div className={styles.cart_button}>
                <button className={styles.btn}>Оформить заказ</button>
        </div>
    </div>
  );
}

export default CartCardList;
