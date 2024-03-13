import styles from "../styles/cart.module.scss";

function OrderForm() {
  return (
    <div className={styles.order_block}>
      <div className={styles.order_title}>
        <span>Способ получения</span>
      </div>
      <form className={styles.order_form}>
          <input type="text" placeholder="Фамилия и имя*" />
          <div className={styles.inputs}>
              <input type="text" placeholder="Телефон *" />
              <input type="text" placeholder="Email" />
          </div>
      </form>
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
            <form className={styles.order__form}>
              <div className={styles.order_select}>
                <select className={styles.mySelect}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                <select className={styles.mySelect}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className={styles.order_inputs}>
                <input type="text" placeholder="Улица" />
                <input type="text" placeholder="Дом/кв" />
              </div>
            </form>
            <div className={styles.order_setTime}>
              <span>от 200 сом (1-3 дня)</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderForm