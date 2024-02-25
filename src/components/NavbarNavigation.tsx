import styles from "../styles/navbar_navigation.module.scss";
import police_car from "../assets/svgs/ri_police-car-fill.svg";
import service from "../assets/svgs/Vector (4).svg";
import gurantee from "../assets/svgs/lets-icons_check-fill.svg";
import discont from "../assets/svgs/ph_percent-fill.svg";

function NavbarNavigation() {
  return (
    <div className={styles.navigation__block}>
        <div className={styles.navigation__block_item}>
            <img src={police_car} />
            <div>Удобная доставка</div>
        </div>
        <div className={styles.navigation__block_item}>
            <img src={service} />
            <div>Быстросервис</div>
        </div>
        <div className={styles.navigation__block_item}>
            <img src={gurantee} />
            <div>Гарантия лучшей цены</div>
        </div>
        <div className={styles.navigation__block_item}>
            <img src={discont} />
            <div>Рассрочка и кредит</div>
        </div>
    </div>
  )
}

export default NavbarNavigation