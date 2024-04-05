import { useEffect, useState } from "react";
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { addOrder, fetchCities, fetchRegions } from "../store/features/order/orderSlice";
import { notify, notifyError } from "./Toastify";

function OrderForm({ products }: any) {
  const regions = useSelector((state: RootStates) => state.orders.regions);
  const cities = useSelector((state: RootStates) => state.orders.cities);
  const [selectedType, setSelectedType] = useState("pickup");

  const dispatch = useDispatch<any>();
  const [loading, setLoading] = useState(true);
  const [sendedForm, setSendedForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRegions()).then(() => setLoading(false));
  }, [dispatch])

  const [regionsChange, setRegionsChange] = useState(0);

  const [orderFormValue, setOrderFormValue] = useState({
    name: "",
    email: selectedType !== "pickup" ? "" : "samovyzov@gmail.com",
    phone: "",
    region: selectedType !== "pickup" ? regionsChange : 1,
    city: selectedType !== "pickup" ? 0 : 1,
    street: selectedType !== "pickup" ? "" : "Ибраимова",
    house: selectedType !== "pickup" ? "" : "108Б",
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(selectedType !== "pickup") {
      if (!name || !email || !phone || !region || !city || !street || !house) {
        notifyError("Заполните все поля формы");
        return;
      }
      if (!emailRegex.test(email)) {
        notifyError("Пожалуйста, введите корректный email");
        return;
      }
    } else {
      if (!name || !phone) {
        notifyError("Заполните все поля формы");
        return;
      }
    }
    try {
      dispatch(addOrder(orderFormValue));
      setSendedForm(true);
      localStorage.removeItem("addedProducts");
      notify("Спасибо за покупку, мы скоро свяжемся с вами")
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.order_block}>
      <div className={styles.order_title}>
        <span>{!sendedForm ? "Способ получения" : ""}</span>
        { !sendedForm ? (
          <div className={styles.order_type}>
          <div className={styles.type_1}>
            <input
              type="radio"
              id="pickup"
              name="deliveryType"
              checked={selectedType === "pickup"}
              className={styles.type_radio}
              onChange={() => setSelectedType("pickup")}
            />
            <label htmlFor="pickup" style={{ height: "16px" }}>Самовывоз</label>
          </div>
          <div className={styles.type_2}>
            <input
              type="radio"
              id="delivery"
              name="deliveryType"
              className={styles.type_radio}
              checked={selectedType === "delivery"}
              onChange={() => setSelectedType("delivery")}
            />
            <label htmlFor="delivery" style={{ height: "16px" }}>Доставка</label>
          </div>
        </div>
        ) : (null) }
      </div>
      <form onSubmit={handleOrder}>
        {!sendedForm ? (
          <>
            <div className={styles.order_form}>
              <input onChange={handleInputChange} value={orderFormValue.name} type="text" placeholder="Фамилия и имя*" name="name" />
              <div className={styles.inputs}>
                <input onChange={handleInputChange} value={orderFormValue.phone} type="text" placeholder="Телефон *" name="phone" />
                { selectedType !== "pickup" ? (
                  <input onChange={handleInputChange} value={orderFormValue.email} type="text" placeholder="Email" name="email" />
                ) : (null) }
              </div>
            </div>
            <div className={styles.order}>
              {selectedType === "pickup" ? (
                <div className={styles.order_wrapper__left}>
                  <div className={styles.order_call}>
                    <span>Самовывоз</span>
                  </div>
                  <div className={styles.order_adress}>
                    <p>г.Бишкек, ул.Ибраимова 108Б</p>
                    <p>пн-вс 09:00-20:00</p>
                  </div>
                  <div className={styles.order_free}>
                    <span>Бесплатно</span>
                  </div>
                  <button className={styles.btn_send_form} style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>Отправить</button>
                </div>
              ) : (
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
                        {regions.length !== 0 ? (
                          cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))
                        ) : (
                            <option>Выберите сначало регион</option>
                          )}
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
              )}
            </div>
          </>
        ) : (
          <div>Отправлено, мы скоро с вами свяжемся.</div>
        )}
      </form>
    </div>
  );
}

export default OrderForm;