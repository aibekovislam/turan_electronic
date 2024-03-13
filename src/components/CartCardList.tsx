import { useEffect, useState } from 'react';
import styles from "../styles/cart.module.scss";
import rate from "../assets/svgs/card/star2:5.svg";
import phone from "../assets/sliderDetail/img01.png";
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { fetchCarts } from '../store/features/favorite_and_cart/cartSlice';
import { calculateDiscountedPrice } from '../functions/calculateDiscounte';
import RecommendationList from './RecommendationList';

function CartCardList() {
  const dispatch = useDispatch<any>();
  const carts = useSelector((state: RootStates) => state.carts.carts);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch])

  console.log(carts)

  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('cartCount');
    return savedCount ? Number(savedCount) : 1;
  });

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrementCount = () => {
    setCount((prevCount) => prevCount > 1 ? prevCount - 1 : 1);
  };

  useEffect(() => {
    localStorage.setItem('cartCount', String(count));
  }, [count]);

  if(carts.length === 0) {
    return (
      <>
        <div className={styles.empty_cart}>
          Ваша корзина пуста
        </div>
        <RecommendationList/>
      </>
    )
  }

  return (
    <div className={styles.cart_main}>
        <div className={styles.cart_path}>
            <span>Главная | Каталог | Корзина</span>
        </div>
        <div className={styles.cart_header}>
            <div>Корзина</div>
            <span>удалить все</span>
        </div>
        { carts?.map((cart: any, index: number) => (
          <div className={styles.cart_container} key={index}>
            <div className={styles.cart}>
                <div className={styles.cart_image}>
                    <img src={cart?.default_image} alt="phone" />
                </div>
                <div className={styles.cart_content}>
                    <p>{ cart?.name }</p>
                    <div className={styles.cart_counter}>
                      <button onClick={decrementCount}>-</button>
                      <span>{count}</span>
                      <button onClick={incrementCount}>+</button>
                    </div>
                </div>
                <div className={styles.cart_price}>
                    <div className={styles.discount_price}>{count * calculateDiscountedPrice(cart?.price, cart?.discount)} сом</div>
                    <div className={styles.default_price}>{count * cart?.price } cом</div>
                </div>
                <div className={styles.cart_rate}>
                { 
                [1, 2, 3, 4, 5].map((star) => (
                  <span
                      key={star}
                      style={{
                        cursor: 'pointer',
                        color: star <= cart.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
                        marginRight: '5px',
                      }}
                  >
                    &#9733;
                  </span>
                ))
                }
                </div>
            </div>
        </div>
        )) }
        <div className={styles.total_block}>
          Итого: {carts
            .map((cart) => count * calculateDiscountedPrice(cart?.price, cart?.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} сом
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn}>Оформить заказ</button>
        </div>
    </div>
  );
}

export default CartCardList;
