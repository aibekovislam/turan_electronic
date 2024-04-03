import { useEffect, useState } from "react";
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { addOrder, fetchCities, fetchRegions } from "../store/features/order/orderSlice";
import { fetchCarts } from "../store/features/favorite_and_cart/cartSlice";
import { notify, notifyError } from "./Toastify";
// import { useNavigate } from "react-router-dom";

function OrderForm({ products }: any) {
  const regions = useSelector((state: RootStates) => state.orders.regions);
  const cities = useSelector((state: RootStates) => state.orders.cities);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const [sendedForm, setSendedForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRegions()).then(() => setLoading(false));
  }, [dispatch])

  const [regionsChange, setRegionsChange] = useState(0);

  const [orderFormValue, setOrderFormValue] = useState({
    name: "",
    email: "",
    phone: "",
    region: regionsChange,
    city: 0,
    street: "",
    house: "",
    items: products.map((item: any) => ({
      product: item.product.id,
      color: item.color,
      memory: item.memory,
      count: item.count,
      price: item.price
    }))  
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "regions") {
      const selectedRegionId = +value;
      setRegionsChange(selectedRegionId);
      setOrderFormValue((prevData) => ({
        ...prevData,
        region: selectedRegionId
      }));
      dispatch(fetchCities(selectedRegionId));
      console.log(regionsChange)
    } else {
      setOrderFormValue((prevData) => ({
        ...prevData,
        [name]: name === "city" ? +value : value
      }));
    }
  }  
  
  const handleOrder = async (e: any) => {
    e.preventDefault();
    const { name, email, phone, region, city, street, house } = orderFormValue;
    if (!name || !email || !phone || !region || !city || !street || !house) {
      notifyError("Заполните все поля формы");
      return;
    }
    try {
      console.log(orderFormValue);
      dispatch(addOrder(orderFormValue));
      console.log(orderFormValue)
      setSendedForm(true);
      console.log(orderFormValue.items)
      dispatch(fetchCarts())
      localStorage.removeItem("addedProducts");
      notify("Спасибо за покупку, мы скоро свяжемся с вами")
      // navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    isMobile ? (
      <div className={styles.order_block}>
        <div className={styles.order_title}>
          <span>{ !sendedForm ? "Способ получения" : "" }</span>
        </div>
        <form onSubmit={handleOrder}>
          { !sendedForm ? (
            <>
              <div className={styles.order_form}>
                <input onChange={handleInputChange} value={orderFormValue.name} type="text" placeholder="Фамилия и имя*" name="name" />
                <div className={styles.inputs}>
                    <input onChange={handleInputChange} value={orderFormValue.phone} type="text" placeholder="Телефон *" name="phone" />
                    <input onChange={handleInputChange} value={orderFormValue.email} type="text" placeholder="Email" name="email" />
                </div>
              </div>
              <div className={styles.order}>
                <div className={styles.order_wrapper__left}>
                    <div className={styles.order_call}>
                      <span>Самовывоз</span>
                    </div>
                    <div className={styles.order_adress}>
                      <p>г.Бишкек ул.Ахунбаева 132</p>
                      <p>пн-вс 09:00-20:00</p>
                    </div>
                    <div className={styles.order_free}>
                      <span>Бесплатно</span>
                    </div>
                </div>
                <div className={styles.order_wrapper__right}>
                    <div className={styles.order_right__title}>
                      <span>Доставка</span>
                    </div>
                    <div className={styles.order__form}>
                      <div className={styles.order_select}>
                        <select onChange={handleInputChange} value={regionsChange} className={styles.mySelect} name="regions">
                          <option value={0}>Выбрать регион</option>
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                        </select>
                        <select
                          onChange={handleInputChange}
                          value={orderFormValue.city}
                          className={styles.mySelect}
                          name="city"
                        >
                          <option value={0}>Выбрать город</option>
                          { regions.length !== 0 ? (
                            cities.map(city => (
                              <option key={city.id} value={city.id}>{city.name}</option>
                            ))
                          ) : (
                            <option>Выберите сначало регион</option>
                          ) }
                        </select>
                      </div>
                      <div className={styles.order_inputs}>
                        <input onChange={handleInputChange} value={orderFormValue.street} type="text" placeholder="Улица" name="street" />
                        <input onChange={handleInputChange} value={orderFormValue.house} type="text" placeholder="Дом/кв" name="house" />
                      </div>
                    </div>
                    <div className={styles.order_setTime}>
                      <span>от 200 сом (1-3 дня)</span>
                    </div>
                    <button className={styles.btn_send_form}>Отправить</button>
                </div>
            </div>
            </>
          ) : (
            <div>Отправлено, мы скоро с вами свяжемся.</div>
          ) } 
        </form>
      </div>
    ) : (
      <div className={styles.order_block}>
        <div className={styles.order_title}>
          <span>{ !sendedForm ? "Способ получения" : "" }</span>
        </div>
        <form onSubmit={handleOrder}>
          { !sendedForm ? (
            <>
              <div className={styles.order_form}>
                <input onChange={handleInputChange} value={orderFormValue.name} type="text" placeholder="Фамилия и имя*" name="name" />
                <div className={styles.inputs}>
                    <input onChange={handleInputChange} value={orderFormValue.phone} type="text" placeholder="Телефон *" name="phone" />
                    <input onChange={handleInputChange} value={orderFormValue.email} type="text" placeholder="Email" name="email" />
                </div>
              </div>
              <div className={styles.order}>
                <div className={styles.order_wrapper__left}>
                    <div className={styles.order_call}>
                      <span>Самовывоз</span>
                    </div>
                    <div className={styles.order_adress}>
                      <p>г.Бишкек ул.Ахунбаева 132</p>
                      <p>пн-вс 09:00-20:00</p>
                    </div>
                    <div className={styles.order_free}>
                      <span>Бесплатно</span>
                    </div>
                </div>
                <div className={styles.order_wrapper__right}>
                    <div className={styles.order_right__title}>
                      <span>Доставка</span>
                    </div>
                    <div className={styles.order__form}>
                      <div className={styles.order_select}>
                        <select onChange={handleInputChange} value={regionsChange} className={styles.mySelect} name="regions">
                          <option value={0}>Выбрать регион</option>
                          {regions.map(region => (
                            <option key={region.id} value={region.id}>{region.name}</option>
                          ))}
                        </select>
                        <select
                          onChange={handleInputChange}
                          value={orderFormValue.city}
                          className={styles.mySelect}
                          name="city"
                        >
                          <option value={0}>Выбрать город</option>
                          { regions.length !== 0 ? (
                            cities.map(city => (
                              <option key={city.id} value={city.id}>{city.name}</option>
                            ))
                          ) : (
                            <option>Выберите сначало регион</option>
                          ) }
                        </select>
                      </div>
                      <div className={styles.order_inputs}>
                        <input onChange={handleInputChange} value={orderFormValue.street} type="text" placeholder="Улица" name="street" />
                        <input onChange={handleInputChange} value={orderFormValue.house} type="text" placeholder="Дом/кв" name="house" />
                      </div>
                    </div>
                    <div className={styles.order_setTime}>
                      <span>от 200 сом (1-3 дня)</span>
                    </div>
                    <button className={styles.btn_send_form}>Отправить</button>
                </div>
            </div>
            </>
          ) : (
            <div>Отправлено, мы скоро с вами свяжемся.</div>
          ) } 
        </form>
      </div>
    )
  )
}

export default OrderForm