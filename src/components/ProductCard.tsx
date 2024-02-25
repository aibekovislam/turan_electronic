import styles from "../styles/productCart.module.scss";

function ProductCard() {
  return (
    <div className={styles.productCart}>
        <div className={styles.productCart__rating}>
            
        </div>
        <div className={styles.productCart__img}></div>
        <div className={styles.productCart__info}></div>
    </div>
  )
}

export default ProductCard