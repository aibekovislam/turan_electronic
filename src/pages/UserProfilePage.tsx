import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { changeName } from "../store/features/auth/authSlice";
import 'ldrs/ring';
import { ping } from 'ldrs'
import { Helmet } from "react-helmet-async";
import { fetchOrderHistory } from "../store/features/order/orderHistory";
import { ProductsType } from "../utils/interfacesAndTypes";
import { API_URL } from "../utils/consts";
import { notifyError } from "../components/Toastify";
import { useTranslation } from "react-i18next";

function UserProfilePage() {
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [ modifiedName, setModifiedName ] = useState(user.name);
  const [ modifiedPhone, setModifiedPhone ] = useState(user.phone_number);
  const [ editUser, setEditUser ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch<any>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
  const tokenString = localStorage.getItem("tokens");
  const token = tokenString ? JSON.parse(tokenString) : null;
  const userOrderHistoryList = useSelector((state: RootStates) => state.orderHistory.orderHistory);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(user)

  useEffect(() => {
    dispatch(fetchOrderHistory())
  }, [dispatch])

  console.log(userOrderHistoryList)

  ping.register();

  const handleChangeName = (e: any) => {
    const { value } = e.target;
    setModifiedName(value);
  }

  const handleChangePhone = (e: any) => {
    const { value } = e.target;
    setModifiedPhone(value);
  }

  const handleSave = () => {
    setLoading(true);
    dispatch(changeName(modifiedName, modifiedPhone)).then(() => {
      setLoading(false);
      setEditUser(false);
    }).catch(() => {
      setLoading(false);
    });
  }

  function getImagesByColor(colorId: any, productData: any) {
    const colorHash = productData.color.find((color: any) => color.id === colorId)?.hash_code;
    return productData.product_images[colorHash][0] || [];
  }

  function getColorHashCode(colorId: any, productData: any) {
    const colorHash = productData.color.find((color: any) => color.id === colorId)?.hash_code;
    return colorHash;
  }

  function logOut() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("chatID");
    navigate("/");
    notifyError(t("left_message"))
  }

  return (
    <>
      <Helmet>
        <title>Профиль {`${user?.name}`} - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"/>
        <link rel="canonical" href={`https://turanelectronics.kg/profile`} />
      </Helmet>
      { user && token ? (
        <>
          <div className={styles.user_main}>
            <div className={styles.section_title}>
              <div className={styles.path}>
                <span onClick={() => navigate("/")}>{ t("home") } /</span> <span onClick={() => navigate("/profile")} >{ t("my_profile") }</span>
              </div>
            </div>
            <div className={styles.user_title}>
              <div>{ t("my_profile") }</div>
              <div className={styles.logOut} onClick={() => logOut()}>
                <button>{ t("logout") }</button>
              </div>
            </div>
            <div className={styles.user_container}>
              <div className={styles.user}>
                <div className={styles.user_wrapper__left}>
                  <li>{t("input_name")}</li>
                  <li>Email</li>
                  <li>{ t("phone") }</li>
                </div>
                <div className={styles.user_wrapper__right}>
                  { !editUser ? (
                    !user.name ? (
                      <li onClick={() => setEditUser(true)}>{ t("fill_input") }</li>
                    ) : (
                      <li>{user?.name}</li>
                    )
                  ) : (
                    <div className={styles.form_to_change}>
                      {loading && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                          <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                          Загрузка...
                        </div>
                      )}
                      { !loading && !isMobile ? (
                        <>
                          <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                { !loading ? (
                                    <div className={styles.mobile_d_f}>
                                      <input type="text" name="name" onChange={handleChangeName} value={modifiedName} className={styles.edit_name} />
                                      <input type="text" name="phone_number" onChange={handleChangePhone} value={modifiedPhone} className={styles.edit_name} style={{ marginTop: "15px" }}  />
                                      <div className={styles.user_button_mobile} style={{ marginTop: "20px" }}>
                                        <button onClick={handleSave}>{ t("save") }</button>
                                      </div>
                                    </div>
                                ) : null }
                            </div>
                          </div>
                        </>
                      ) : null }
                    </div>
                  ) }
                  <li>{user?.email}</li>
                  { !user.name ? <li onClick={() => setEditUser(true)}>{ t("fill_input") }</li> : <li>{user.phone_number}</li> }
                </div>
              </div>        
                  <div className={styles.user_button} onClick={() => setEditUser(true)}>
                    <button>{ t("edit") }</button>
                  </div>
            </div>
            { isMobile && editUser ? (
              <div className={styles.modal}>
                <div className={styles.modalContent}>
                    { !loading ? (
                        <div className={styles.mobile_d_f}>
                          <span className={styles.close_edit} onClick={() => setEditUser(false)}>X</span>
                          <input style={{ width: "max-content", height: "45px" }} type="text" name="name" onChange={handleChangeName} value={modifiedName} className={styles.edit_name} placeholder={`${t("input_name")}`} />
                          <input style={{ width: "max-content", height: "45px", marginTop: "10px" }} type="text" name="phone_number" onChange={handleChangePhone} value={modifiedPhone} className={styles.edit_name} placeholder={`${t("phone")}`} />
                          <div className={styles.user_button_mobile} style={{ marginTop: "20px" }}>
                            <button onClick={handleSave}>{ t("save") }</button>
                          </div>
                        </div>
                    ) : null }
                </div>
              </div>
            ) : null } 
          </div>
          <div className={styles.order_history}>
            <h2 className={styles.order_history__title}>{ t("history_orders") }:</h2>
            <div className={styles.order_history_blocks}>
              { userOrderHistoryList?.map((item: any, index: number) => (
                <div key={index}>
                  <span className={styles.order_history__date}>{ new Date(item.created_at).toLocaleDateString('ru-RU') } { new Date(item.created_at).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }</span>
                  { item.items.map((product: ProductsType, key_index: number) => (
                    <>
                      <div className={styles.cart_container} key={key_index}>
                        <div className={styles.cart}>
                          <div className={styles.cart_image}>
                            {product.product_details.product_images ? (
                              <img src={getImagesByColor(product.color, product.product_details).length !== 0 ? `${API_URL}${getImagesByColor(product.color, product.product_details)}` : `${product.product_details.default_image}`} alt="phone" />
                            ) : (
                              <l-ping
                                size="45"
                                speed="2"
                                color="black"
                              ></l-ping>
                            )}
                          </div>
                          <div className={styles.cart_content}>
                            <p style={{ wordBreak: 'break-word', maxWidth: "300px" }} >{ currentLanguage === "Русский" ? product.product_details?.name : product.product_details?.name_en}</p>
                            <div className={styles.cart_description} >{currentLanguage === "Русский" ? product.product_details.description?.slice(0, 120) : product.product_details.description_en?.slice(0, 120)}...</div>
                            <div className={styles.colors}> { t("color") }:
                              {getColorHashCode(product.color, product.product_details).length !== 0 ? (
                                <div key={index} className={styles.color_block} style={{ background: getColorHashCode(product.color, product.product_details) }}></div>
                              ) : (
                                <l-ping
                                  size="45"
                                  speed="2"
                                  color="black"
                                ></l-ping>
                              )}
                            </div>
                          </div>
                          <div className={styles.cart_price}>
                            <div className={styles.discount_price}>{(product.count || 1) * product.price} { t("sum") }</div>
                          </div>
                          <div className={styles.cart_rate}>
                            {
                              [1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  style={{
                                    cursor: 'pointer',
                                    color: star <= product.product_details.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
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
                    </>
                  )) }
                  <hr/>
                  <div className={styles.total_block}>
                    { t("end_price") }: { item.items.map((product: any) => {
                      return product.count * product.price
                    }).reduce((acc: any, price: any) => acc + price, 0)
                    .toLocaleString("ru-RU")} { t("sum") } 
                  </div>
                </div>
              )) }
            </div>
          </div>
        </>
      ) : (null) }
    </>
  );
}

export default UserProfilePage;