import styles from "../styles/card.module.scss"
import shop from "../assets/svgs/card/shop.svg"
import { useTranslation } from "react-i18next"

function MiniCardMobile({ accessories, onClick, }: any) {
    const { t } = useTranslation();
  return (
    <div className={styles.mini_mobile__main}>
        <div className={styles.mini_mobile__container}>
            <div className={styles.mini_mobile}>
                <div className={styles.mini_mobile__star} >
                    {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={{ color: star <= accessories.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray', marginRight: "5px" }}
                                >
                                &#9733;
                            </span>
                    ))}
                </div>
                <div className={styles.mini_mobile__content} onClick={onClick}>
                    <img src={`${accessories.default_image}`} alt="" />
                    <span>{accessories.name.slice(0, 15)}{ accessories.name.length > 15 ? "..." : "" }</span>
                </div>
                <div className={styles.mini_mobile__utils}>
                    <span>{accessories.price} <br/> { t("sum") }</span>
                    <div>
                        <img src={shop} alt="" className={styles.cart} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MiniCardMobile
