import styles from "../styles/brands_and_footer.module.scss";
import apple from "../assets/svgs/brands/image 33.svg";
import dyson from "../assets/svgs/brands/image 34.svg";
import playstation from "../assets/svgs/brands/image 35.svg";
import samsung from "../assets/svgs/brands/image 36.svg";
import xiaomi from "../assets/svgs/brands/image 37.svg";

function Brands() {
  return (
    <div className={styles.brands}>
        <div className={styles.brands__item}>
            <div className={styles.brands__title}>Бренды</div>
        </div>
        <div className={styles.brands__item}>
            <div className={styles.brands__img}>
                <img src={apple} />
            </div>
            <div className={styles.brands__img}>
                <img src={dyson} />
            </div>
            <div className={styles.brands__img}>
                <img src={playstation} />
            </div>
            <div className={styles.brands__img}>
                <img src={samsung} />
            </div>
            <div className={styles.brands__img}>
                <img src={xiaomi} />
            </div>
        </div>
    </div>
  )
}

export default Brands