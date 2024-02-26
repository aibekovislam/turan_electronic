import styles from "../styles/card.module.scss";
import star2 from "../assets/svgs/card/star2:5.svg"
import shop from "../assets/svgs/card/shop.svg"

function MiniCard({ style }: any) {
  return (
    <div className={styles.card_main} style={style}>
        <div className={styles.card_container}>
            <div className={styles.card}>
                <div className={styles.star_container}>
                    <img src={star2} className={styles.star} />
                </div>
                <div className={styles.img_container}>
                    <img style={{ maxWidth: "133px", maxHeight: "133px", objectFit: "contain" }} src={"https://molla.al/wp-content/uploads/2020/09/18W-charger.png"}  />
                </div>
                <div className={styles.title_container}>
                    <div className={styles.title}>
                        <h2 style={{ fontSize: "14px", fontWeight: "400", textAlign: "center" }}>Адаптер</h2>
                    </div>
                    <div className={styles.price} style={{ display: 'block' }}>
                        <h2 style={{ fontSize: "17px", fontWeight: "500", textAlign: "center" }}>5700 сом</h2>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.btn}>
                        <a href="#">Быстрый заказ</a>
                    </button>
                    <img src={shop} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MiniCard;