import styles from "../styles/cart.module.scss";

function OrderForm() {
  return (
    <div className={styles.order_block}>
        <form className={styles.order_form}>
            <input type="text" placeholder="Фамилия и имя*" />
            <div className={styles.inputs}>
                <input type="text" placeholder="Телефон *" />
                <input type="text" placeholder="Email" />
            </div>
        </form>
    </div>
  )
}

export default OrderForm