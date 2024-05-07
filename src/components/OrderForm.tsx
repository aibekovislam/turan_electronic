import { SetStateAction, useEffect, useState } from "react";
import styles from "../styles/cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { addOrder, fetchCities, fetchRegions } from "../store/features/order/orderSlice";
import { notify, notifyError } from "./Toastify";
import '../styles/homepage.scss'
import { useTranslation } from "react-i18next";

function OrderForm({ products }: any) {
  const regions = useSelector((state: RootStates) => state.orders.regions);
  const cities = useSelector((state: RootStates) => state.orders.cities);
  const [selectedType, setSelectedType] = useState("pickup");
  const { t } = useTranslation();

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

  const handleDeliveryTypeChange = (type: SetStateAction<string>) => {
    setSelectedType(type);
    if (type === "pickup") {
      setOrderFormValue({
        name: "",
        email: "samovyzov@gmail.com",
        phone: "",
        region: 1,
        city: 1,
        street: "Ибраимова",
        house: "108Б",
        items: products.map((item: any) => ({
          product: item.product.id,
          color: item.color,
          memory: item.memory,
          count: item.count,
          price: item.price
        }))  
      });
    } else if (type === "delivery") {
      setOrderFormValue({
        name: "",
        email: "",
        phone: "",
        region: 0,
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
      });
    }
  };  

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
    console.log(orderFormValue)

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
        <span>{!sendedForm ? `${t("different_get")}` : ""}</span>
        { !sendedForm ? (
          <div className={styles.order_type}>
          <div className={styles.type_1}>
            <input
              type="radio"
              id="pickup"
              name="deliveryType"
              checked={selectedType === "pickup"}
              className={styles.type_radio}
              onChange={() => handleDeliveryTypeChange("pickup")}
            />
            <label htmlFor="pickup" style={{ height: "16px" }}>{ t("self_order") }</label>
          </div>
          <div className={styles.type_2}>
            <input
              type="radio"
              id="delivery"
              name="deliveryType"
              className={styles.type_radio}
              checked={selectedType === "delivery"}
              onChange={() => handleDeliveryTypeChange("delivery")}
            />
            <label htmlFor="delivery" style={{ height: "16px" }}>{ t("deliver") }</label>
          </div>
        </div>
        ) : (null) }
      </div>
      <form onSubmit={handleOrder}>
        {!sendedForm ? (
          <>
            <div className={styles.order_form}>
              <input onChange={handleInputChange} value={orderFormValue.name} type="text" placeholder={`${t("name_and_surname")}*`} name="name" />
              <div className={styles.inputs}>
                <input onChange={handleInputChange} value={orderFormValue.phone} type="number" placeholder={`${t("phone")}*`} name="phone" />
                { selectedType !== "pickup" ? (
                  <input onChange={handleInputChange} value={orderFormValue.email} type="text" placeholder="Email" name="email" />
                ) : (null) }
              </div>
            </div>
            <div className={styles.order}>
              {selectedType === "pickup" ? (
                <div className={styles.order_wrapper__left}>
                  <div className={styles.order_call}>
                    <span>{ t("self_order") }</span>
                  </div>
                  <div className={styles.order_adress}>
                    <p>{ t("address") }</p>
                    <p>пн-вс 09:00-20:00</p>
                  </div>
                  <div className={styles.order_free}>
                    <span>{ t("free") }</span>
                  </div>
                  <button className={styles.btn_send_form} style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>{ t("send") }</button>
                </div>
              ) : (
                <div className={styles.order_wrapper__right}>
                  <div className={styles.order_right__title}>
                    <span>{ t("deliver") }</span>
                  </div>
                  <div className={styles.order__form}>
                    <div className={styles.order_select}>
                      <select onChange={handleInputChange} value={regionsChange} className={styles.mySelect} name="regions">
                        <option value={0}>{ t("choose_region") }</option>
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
                        <option value={0}>{ t("choose_city") }</option>
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
                      <input onChange={handleInputChange} value={orderFormValue.street} type="text" placeholder={`${t("street")}`} name="street" />
                      <input onChange={handleInputChange} value={orderFormValue.house} type="text" placeholder={`${t("home_order")}`} name="house" />
                    </div>
                  </div>
                  <div className={styles.order_setTime}>
                  <span>
                    {regions && regions.length !== 0 ? 
                      (cities.find((item) => item.id === orderFormValue.city)?.delivery_price !== 0 && cities.find((item) => item.id === orderFormValue.city)?.delivery_price ? 
                        (cities.find((item) => item.id === orderFormValue.city)?.delivery_price + ` ${t("sum")} ` || `${t("free")}`) 
                        : `${t("free")}`)
                      : `${t("free")}`
                    } { " " } 1-3 { t("day") }
                  </span>
                  </div>
                  <button className={styles.btn_send_form}>{ t("send") }</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>{ t("sended") }</div>
        )}
      </form>
    </div>
  );
}

export default OrderForm;