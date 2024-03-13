import { useEffect, useState } from 'react';
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { fetchCarts } from '../store/features/favorite_and_cart/cartSlice';
import { calculateDiscountedPrice } from '../functions/calculateDiscounte';
import RecommendationList from './RecommendationList';
import OrderForm from './OrderForm';

function CartCardList() {
  const dispatch = useDispatch<any>();
  const carts = useSelector((state: RootStates) => state.carts.carts);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch])

  const [counts, setCounts] = useState<{[key: string]: number}>(() => {
    const savedCounts = localStorage.getItem('cartCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  const incrementCount = (id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
  };

  const decrementCount = (id: string) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 1) // Ensure count never goes below 1
    }));
  };

  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(counts));
  }, [counts]);

  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleOrderButtonClick = () => {
    setShowOrderForm(true);
  };

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
                      <button onClick={() => decrementCount(cart.id)}>−</button>
                      <span>{counts[cart.id] || 1}</span> {/* Set default value to 1 */}
                      <button onClick={() => incrementCount(cart.id)}>+</button>
                    </div>
                </div>
                <div className={styles.cart_price}>
                    <div className={styles.discount_price}>{(counts[cart.id] || 1) * calculateDiscountedPrice(cart?.price, cart?.discount)} сом</div> {/* Set default value to 1 */}
                    <div className={styles.default_price}>{(counts[cart.id] || 1) * cart?.price } сом</div> {/* Set default value to 1 */}
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
            .map((cart) => (counts[cart.id] || 1) * calculateDiscountedPrice(cart?.price, cart?.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} сом
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn} onClick={handleOrderButtonClick}>Оформить заказ</button>
        </div>
        {showOrderForm && <OrderForm/>}
    </div>
  );
}

export default CartCardList;
