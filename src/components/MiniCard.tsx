import styles from "../styles/card.module.scss";
import shop from "../assets/svgs/card/shop.svg"
import { useTranslation } from "react-i18next";

function MiniCard({ accessories, onClick, style }: any) {
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    return (
        <div className={styles.card_mini} style={style} onClick={onClick}>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.star_container__mini}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div key={star}>
                                <span
                                    key={star}
                                    style={{ color: star <= accessories.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray', marginRight: "5px" }}
                                    >
                                    &#9733;
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.img_container}>
                        <img style={{ maxWidth: "133px", maxHeight: "133px", objectFit: "contain" }} src={`${accessories.default_image}`}  />
                    </div>
                    <div className={styles.title_container}>
                        <div className={styles.title}>
                            <h2 style={{ fontSize: "14px", fontWeight: "400", textAlign: "center" }}>{currentLanguage === "Русский" ? accessories.name : accessories.name_en}</h2>
                        </div>
                        <div className={styles.price_access} style={{ display: 'block' }}>
                            <h2>{accessories.price} { t("sum") }</h2>
                        </div>
                    </div>
                    <div className={styles.btn_container}>
                        <button className={styles.btn} style={{ width: "170px" }}>
                            <a href="#">{ t("fast_order_btn") }</a>
                        </button>
                        <img src={shop} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniCard;