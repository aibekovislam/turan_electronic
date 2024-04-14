import styles from "../styles/card.module.scss";
import shop from "../assets/svgs/card/shop.svg"
import { API_URL } from "../utils/consts";

function MiniCard({ accessories, onClick, style }: any) {
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
                    <img style={{ maxWidth: "133px", maxHeight: "133px", objectFit: "contain" }} src={`${API_URL}/${accessories.default_image?.slice(16)}`}  />
                </div>
                <div className={styles.title_container}>
                    <div className={styles.title}>
                        <h2 style={{ fontSize: "14px", fontWeight: "400", textAlign: "center" }}>{accessories.name}</h2>
                    </div>
                    <div className={styles.price_access} style={{ display: 'block' }}>
                        <h2>{accessories.price} сом</h2>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.btn} style={{ width: "170px" }}>
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