import styles from "../styles/navbar_navigation.module.scss";
import police_car from "../assets/svgs/ri_police-car-fill.svg";
import service from "../assets/svgs/Vector (4).svg";
import gurantee from "../assets/svgs/lets-icons_check-fill.svg";
import discont from "../assets/svgs/ph_percent-fill.svg";
import { useTranslation } from "react-i18next";

function NavbarNavigation() {
    const { t } = useTranslation();
  return (
    <div className={styles.navigation__block}>
        <div className={styles.navigation__block_item}>
            <img src={police_car} />
            <div>{ t("delivery") }</div>
        </div>
        <div className={styles.navigation__block_item}>
            <img src={service} />
            <div>{ t("services") }</div>
        </div>
        <div className={styles.navigation__block_item}>
            <img src={gurantee} />
            <div>{ t("gurantee") }</div>
        </div>
        <div className={styles.navigation__block_item}>
            <img src={discont} />
            <div>{ t("credit") }</div>
        </div>
    </div>
  )
}

export default NavbarNavigation