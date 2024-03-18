import { useEffect, useState } from 'react';
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { changeCountCartProduct, clearCart, deleteCart, fetchCarts } from '../store/features/favorite_and_cart/cartSlice';
import { calculateDiscountedPrice } from '../functions/calculateDiscounte';
import RecommendationList from './RecommendationList';
import OrderForm from './OrderForm';
import { API_URL } from '../utils/consts';

function CartCardList() {
  const dispatch = useDispatch<any>();
  const carts = useSelector((state: RootStates) => state.carts.carts);
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const pickedColorJSON = localStorage.getItem("colorPicked");
  const colorPicked = pickedColorJSON ? JSON.parse(pickedColorJSON) : null;
  
  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch])

  const [counts, setCounts] = useState<{[key: string]: number}>(() => {
    const savedCounts = localStorage.getItem('cartCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  const incrementCount = (id: string) => {
    dispatch(changeCountCartProduct(counts[id] + 1, +id));
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
    // setClickedCount(true);
  };  

  const decrementCount = (id: string) => {
    if (counts[id] <= 1) {
      dispatch(deleteCart(+id));
    } else {
      dispatch(changeCountCartProduct(counts[id] - 1, +id));
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: Math.max((prevCounts[id] || 0) - 1, 1)
      }));
    }
    // setClickedCount(true);
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
            <span onClick={() => dispatch(clearCart())}>Очистить корзину</span>
        </div>
        { carts?.map((cart: any, index: number) => (
          <div className={styles.cart_container} key={index}>
            <div className={styles.cart}>
                <div className={styles.cart_image}>
                  {colorPicked ? (
                    <img src={cart.product.product_images[colorPicked].length !== 0 ? `${API_URL}${cart.product.product_images[colorPicked]}` : cart.product.default_image} alt="phone" />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
                <div className={styles.cart_content}>
                    <p>{ `${cart?.product.name} ${cart.memory_name !== "Нету" && cart.memory_name} `}ГБ</p>
                    <div className={styles.cart_description} >{ cart?.product.description.slice(0, 120) }...</div>
                    <div className={styles.colors}> Цвета: 
                      { colorPicked !== null ? (
                          <div key={index} className={styles.color_block} style={{ background: colorPicked }}></div>
                        ) : (
                          <div>Loading...</div>
                      ) }
                    </div>
                    <div className={styles.cart_counter}>
                      <button onClick={() => {
                        if (counts[cart.id] <= 1){
                          dispatch(deleteCart(cart.id))
                          console.log(cart.id)
                        } else {
                          decrementCount(cart.id)
                        }
                      }}>−</button>
                      <span>{counts[cart.id] || 1}</span> 
                      <button onClick={() => incrementCount(cart.id)}>+</button>
                    </div>
                </div>
                <div className={styles.cart_price}>
                    <div className={styles.discount_price}>{(counts[cart.id] || 1) * calculateDiscountedPrice(cart?.product.price, cart?.product.discount)} сом</div>
                    <div className={styles.default_price}>{(counts[cart.id] || 1) * cart?.product.price } сом</div>
                </div>
                <div className={styles.cart_rate}>
                { 
                [1, 2, 3, 4, 5].map((star) => (
                  <span
                      key={star}
                      style={{
                        cursor: 'pointer',
                        color: star <= cart.product.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
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
            .map((cart) => (counts[cart.id] || 1) * calculateDiscountedPrice(cart?.product.price, cart?.product.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} сом
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn} onClick={handleOrderButtonClick}>Оформить заказ</button>
        </div>
        {showOrderForm && <OrderForm user={user} products={carts} />}
    </div>
  );
}

export default CartCardList;
