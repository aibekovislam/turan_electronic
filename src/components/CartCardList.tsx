import { useEffect, useState } from 'react';
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootStates } from '../store/store';
import { changeCountCartProduct, clearCart, deleteCart, fetchCarts } from '../store/features/favorite_and_cart/cartSlice';
import { calculateDiscountedPrice } from '../functions/calculateDiscounte';
import RecommendationList from './RecommendationList';
import OrderForm from './OrderForm';
import { API_URL } from '../utils/consts';
import 'ldrs/ring';
import { ping } from 'ldrs'

function CartCardList() {
  const dispatch = useDispatch<any>();
  const carts = useSelector((state: RootStates) => state.carts.carts);
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

  ping.register()

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [counts, setCounts] = useState<{ [key: string]: number }>(() => {
    const savedCounts = localStorage.getItem('cartCounts');
    return savedCounts ? JSON.parse(savedCounts) : {};
  });

  const incrementCount = (id: string) => {
    dispatch(changeCountCartProduct(counts[id] + 1, +id));
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
  };

  const decrementCount = (id: string) => {
    const updatedCount = Math.max((counts[id] || 0) - 1, 1);
    if (updatedCount <= 1) {
      localStorage.removeItem("addedProducts");
      dispatch(deleteCart(+id));
    } else {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: updatedCount
      }));
      dispatch(changeCountCartProduct(updatedCount, +id));
    }
  };



  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(counts));
  }, [counts]);

  const [showOrderForm, setShowOrderForm] = useState(false);

  const handleOrderButtonClick = () => {
    setShowOrderForm(true);
  };

  function getImagesByColor(colorId: any, productData: any) {
    const colorHash = productData.color.find((color: any) => color.id === colorId)?.hash_code;
    return productData.product_images[colorHash][0] || [];
  }

  function getColorHashCode(colorId: any, productData: any) {
    const colorHash = productData.color.find((color: any) => color.id === colorId)?.hash_code;
    return colorHash;
  }

  if (carts.length === 0) {
    return (
      <>
        <div className={styles.empty_cart}>
          Ваша корзина пуста
        </div>
        <RecommendationList />
      </>
    )
  }

  const filterPriceToMemory = (product: any, memory_name: any) => {
    const memory = product?.memory_price ? product?.memory_price[memory_name] : null;
    if (memory) {
      const price = memory.replace(/[^\d.]/g, '');
      return price;
    } else {
      console.log('Цена для указанной памяти не найдена');
      return null;
    }
  }

  return (
    isMobile ? (
      <div className={styles.cart_main}>
        <div className={styles.cart_path}>
          <span>Главная | Каталог | Корзина</span>
        </div>
        <div className={styles.cart_header}>
          <div>Корзина</div>
          <span onClick={() => dispatch(clearCart())}>Очистить корзину</span>
        </div>
        {carts?.map((cart: any, index: number) => (
          <div className={styles.cart_container} key={index}>
            <div className={styles.cart}>
              <div className={styles.cart_image}>
                {cart.product.product_images ? (
                  <img src={getImagesByColor(cart.color, cart.product).length !== 0 ? `${API_URL}${getImagesByColor(cart.color, cart.product)}` : cart.product.default_image} alt="phone" />
                ) : (
                  <l-ping
                    size="45"
                    speed="2"
                    color="black"
                  ></l-ping>
                )}
              </div>
              <div className={styles.cart_content}>
                <p>{`${cart?.product.name} ${cart.memory_name !== "0" ? cart.memory_name + " ГБ" : ""} `}</p>
                <div className={styles.cart_description} >{cart?.product.description.slice(0, 120)}...</div>
                <div className={styles.colors}> Цвета:
                  {getColorHashCode(cart.color, cart.product).length !== 0 ? (
                    <div key={index} className={styles.color_block} style={{ background: getColorHashCode(cart.color, cart.product) }}></div>
                  ) : (
                    <l-ping
                      size="45"
                      speed="2"
                      color="black"
                    ></l-ping>
                  )}
                </div>
                <div className={styles.cart_counter}>
                  <button onClick={() => {
                    decrementCount(cart.id)
                    console.log("clicked")
                  }}>−</button>
                  <span>{counts[cart.id] || 1}</span>
                  <button onClick={() => incrementCount(cart.id)}>+</button>
                </div>
              </div>
              <div className={styles.cart_price}>
                {cart.product.discount !== 0 ? (
                  <>
                    <div className={styles.discount_price}>{(counts[cart.id] || 1) * calculateDiscountedPrice(filterPriceToMemory(cart?.product, cart?.memory_name), cart?.product.discount)} сом</div>
                    <div className={styles.default_price}>{(counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name)} сом</div>
                  </>
                ) : (
                  <div className={styles.discount_price}>{cart.product.memory_price !== null ? (counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name) : (counts[cart.id] || 1) * cart.product.price} сом</div>
                )}
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
        ))}
        <div className={styles.total_block}>
          Итого: {carts
            .map((cart) => (counts[cart.id] || 1) * calculateDiscountedPrice(cart.product.memory_price !== null ? filterPriceToMemory(cart?.product, cart?.memory_name) : cart?.product.price, cart?.product.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} сом
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn} onClick={handleOrderButtonClick}>Оформить заказ</button>
        </div>
        {showOrderForm && <OrderForm user={user} products={carts} />}
      </div>
    ) : (
      <div className={styles.cart_main}>
        <div className={styles.cart_path}>
          <span>Главная | Каталог | Корзина</span>
        </div>
        <div className={styles.cart_header}>
          <div>Корзина</div>
          <span onClick={() => dispatch(clearCart())}>Очистить корзину</span>
        </div>
        {carts?.map((cart: any, index: number) => (
          <div className={styles.cart_container} key={index}>
            <div className={styles.cart}>
              <div className={styles.cart_image}>
                {cart.product.product_images ? (
                  <img src={getImagesByColor(cart.color, cart.product).length !== 0 ? `${API_URL}${getImagesByColor(cart.color, cart.product)}` : cart.product.default_image} alt="phone" />
                ) : (
                  <l-ping
                    size="45"
                    speed="2"
                    color="black"
                  ></l-ping>
                )}
              </div>
              <div className={styles.cart_content}>
                <p>{`${cart?.product.name} ${cart.memory_name !== "0" ? cart.memory_name + " ГБ" : ""} `}</p>
                <div className={styles.cart_description} >{cart?.product.description.slice(0, 120)}...</div>
                <div className={styles.colors}> Цвета:
                  {getColorHashCode(cart.color, cart.product).length !== 0 ? (
                    <div key={index} className={styles.color_block} style={{ background: getColorHashCode(cart.color, cart.product) }}></div>
                  ) : (
                    <l-ping
                      size="45"
                      speed="2"
                      color="black"
                    ></l-ping>
                  )}
                </div>
                <div className={styles.cart_counter}>
                  <button onClick={() => {
                    decrementCount(cart.id)
                    console.log("clicked")
                  }}>−</button>
                  <span>{counts[cart.id] || 1}</span>
                  <button onClick={() => incrementCount(cart.id)}>+</button>
                </div>
              </div>
              <div className={styles.cart_price}>
                {cart.product.discount !== 0 ? (
                  <>
                    <div className={styles.discount_price}>{(counts[cart.id] || 1) * calculateDiscountedPrice(filterPriceToMemory(cart?.product, cart?.memory_name), cart?.product.discount)} сом</div>
                    <div className={styles.default_price}>{(counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name)} сом</div>
                  </>
                ) : (
                  <div className={styles.discount_price}>{cart.product.memory_price !== null ? (counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name) : (counts[cart.id] || 1) * cart.product.price} сом</div>
                )}
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
        ))}
        <div className={styles.total_block}>
          Итого: {carts
            .map((cart) => (counts[cart.id] || 1) * calculateDiscountedPrice(cart.product.memory_price !== null ? filterPriceToMemory(cart?.product, cart?.memory_name) : cart?.product.price, cart?.product.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} сом
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn} onClick={handleOrderButtonClick}>Оформить заказ</button>
        </div>
        {showOrderForm && <OrderForm user={user} products={carts} />}
      </div>
    )
  );
}

export default CartCardList;
