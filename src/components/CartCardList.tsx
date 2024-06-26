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
import { useTranslation } from 'react-i18next';

function CartCardList() {
  const dispatch = useDispatch<any>();
  const carts = useSelector((state: RootStates) => state.carts.carts);
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language
  
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


  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(counts));
  }, [counts]);

  useEffect(() => {
    setCounts((prevCounts) => {
      const newCounts: any = {};
      carts.forEach((cart) => {
        newCounts[cart.id] = prevCounts[cart.id] || 1;
      });
      return newCounts;
    });
  }, [carts]);


  const incrementCount = (id: string) => {
    dispatch(changeCountCartProduct(counts[id] + 1, +id));
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    }));
  };

  const decrementCount = (id: string) => {
    const updatedCount = Math.max((counts[id] || 0) - 1, 0);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: updatedCount
    }));

    dispatch(changeCountCartProduct(updatedCount, +id));

    if (updatedCount < 1) {
      localStorage.removeItem("addedProducts");
      dispatch(deleteCart(+id));
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
          { t("empty_cart") }
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
          <span>{ t("home") } | { t("cart") }</span>
        </div>
        <div className={styles.cart_header}>
          <div>{ t("cart") }</div>
          <span onClick={() => dispatch(clearCart())}>{ t("clear_cart") }</span>
        </div>
        {carts?.map((cart: any, index: number) => (
          <div className={styles.cart_container} key={index}>
            <div className={styles.cart}>
              <div className={styles.cart_image}>
                {cart.product.product_images ? (
                  <img src={getImagesByColor(cart.color, cart.product).length !== 0 ? `${API_URL}${getImagesByColor(cart.color, cart.product)}` : `${cart.product.default_image}`} alt={cart.product.name} />
                ) : (
                  <l-ping
                    size="45"
                    speed="2"
                    color="black"
                  ></l-ping>
                )}
              </div>
              <div className={styles.cart_content}>
                <p>{currentLanguage === "Русский" ? cart?.product.name : cart?.product.name_en}</p>
                <div className={styles.cart_description} >{ cart?.product.description_en && (currentLanguage === "Русский" ? cart?.product.description.slice(0, 120) : cart?.product.description_en.slice(0, 120))}...</div>
                <div className={styles.colors}> { t("color") }:
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
                  }}>−</button>
                  <span>{cart.count}</span>
                  <button onClick={() => incrementCount(cart?.id)}>+</button>
                </div>
                <div className={styles.delete_cart_block} onClick={() => {
                  const stringProducts = localStorage.getItem("addedProducts");
                  const addedProducts = stringProducts ? JSON.parse(stringProducts) : [];

                  const updatedProducts = addedProducts.filter((productId: any) => productId !== cart.product.id);

                  if (JSON.stringify(addedProducts) !== JSON.stringify(updatedProducts)) {
                    localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
                  }

                  dispatch(deleteCart(cart.id));
                  dispatch(fetchCarts())
                }}>
                  { t("delete") }
                </div>
              </div>
              <div className={styles.cart_price}>
                {cart.product.discount !== 0 ? (
                  <>
                    <div className={styles.discount_price}>{(counts[cart.id] || 1) * calculateDiscountedPrice(filterPriceToMemory(cart?.product, cart?.memory_name), cart?.product.discount)} { t("sum") }</div>
                    <div className={styles.default_price}>{(counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name)} { t("sum") }</div>
                  </>
                ) : (
                  <div className={styles.discount_price}>{cart.product.memory_price !== null ? (counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name) : (counts[cart.id] || 1) * cart.product.price} { t("sum") }</div>
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
          { t("end_price") }: {carts
            .map((cart) => (counts[cart.id] || 1) * calculateDiscountedPrice(cart.product.memory_price !== null ? filterPriceToMemory(cart?.product, cart?.memory_name) : cart?.product.price, cart?.product.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} { t("sum") }
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn} onClick={handleOrderButtonClick}>{ t("order_add") }</button>
        </div>
        {showOrderForm && <OrderForm user={user} products={carts} />}
      </div>
    ) : (
      <div className={styles.cart_main}>
        <div className={styles.cart_path}>
          <span>{ t("home") } | { t("cart") }</span>
        </div>
        <div className={styles.cart_header}>
          <div>{ t("cart") }</div>
          <span onClick={() => dispatch(clearCart())}>{ t("clear_cart") }</span>
        </div>
        {carts?.map((cart: any, index: number) => (
          <div className={styles.cart_container} key={index}>
            <div className={styles.cart}>
              <div className={styles.cart_image}>
                {cart.product.product_images ? (
                  <img src={getImagesByColor(cart.color, cart.product).length !== 0 ? `${API_URL}${getImagesByColor(cart.color, cart.product)}` : `${cart.product.default_image}`} alt={`image ${cart.product.name}`} />
                ) : (
                  <l-ping
                    size="45"
                    speed="2"
                    color="black"
                  ></l-ping>
                )}
              </div>
              <div className={styles.cart_content}>
                <p>{`${cart?.product.name} ${cart.memory_name !== "0" ? cart.memory_name + ` ${t("gb")}` : ""} `}</p>
                <div className={styles.cart_description} >{cart?.product.description.slice(0, 120)}...</div>
                <div className={styles.colors}> { t("color") }:
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
                  }}>−</button>
                  <span>{counts[cart.id] || 1}</span>
                  <button onClick={() => incrementCount(cart.id)}>+</button>
                </div>
                <div className={styles.delete_cart_block} onClick={() => {
                  const stringProducts = localStorage.getItem("addedProducts");
                  const addedProducts = stringProducts ? JSON.parse(stringProducts) : [];

                  const updatedProducts = addedProducts.filter((productId: any) => productId !== cart.product.id);

                  if (JSON.stringify(addedProducts) !== JSON.stringify(updatedProducts)) {
                    localStorage.setItem("addedProducts", JSON.stringify(updatedProducts));
                  }

                  dispatch(deleteCart(cart.id));

                  dispatch(fetchCarts())
                }}>
                  { t("delete") }
                </div>
              </div>
              <div className={styles.cart_price}>
                {cart.product.discount !== 0 ? (
                  <>
                    <div className={styles.discount_price}>{(counts[cart.id] || 1) * calculateDiscountedPrice(filterPriceToMemory(cart?.product, cart?.memory_name), cart?.product.discount)} { t("sum") }</div>
                    <div className={styles.default_price}>{(counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name)} { t("sum") }</div>
                  </>
                ) : (
                  <div className={styles.discount_price}>{cart.product.memory_price !== null ? (counts[cart.id] || 1) * filterPriceToMemory(cart?.product, cart?.memory_name) : (counts[cart.id] || 1) * cart.product.price} { t("sum") }</div>
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
          { t("end_price") }: {carts
            .map((cart) => (counts[cart.id] || 1) * calculateDiscountedPrice(cart.product.memory_price !== null ? filterPriceToMemory(cart?.product, cart?.memory_name) : cart?.product.price, cart?.product.discount))
            .reduce((acc, price) => acc + price, 0)
            .toLocaleString("ru-RU")} { t("sum") }
        </div>
        <div className={styles.cart_button}>
          <button className={styles.btn} onClick={handleOrderButtonClick}>{ t("order_add") }</button>
        </div>
        {showOrderForm && <OrderForm user={user} products={carts} />}
      </div>
    )
  );
}

export default CartCardList;
