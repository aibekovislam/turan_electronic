import styles from "../styles/card.module.scss"
import star2 from "../assets/svgs/card/star2:5.svg"
import black from "../assets/svgs/card/black.svg"
import white from "../assets/svgs/card/white.svg"
import lightBrown from "../assets/svgs/card/lightBrrown.svg"
import shop from "../assets/svgs/card/shop.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import phone from "../assets/card/Phone.png"
import checked from "../assets/svgs/card/Vector (9).svg";

function NewProductsCard() {
  return (
    <div className={styles.card_main}>
        <div className={styles.card_container}>
            <div className={styles.card}>
                <div className={styles.star_container}>
                    <div className={styles.new_productCard_label}>
                        Новое
                    </div>
                    <img src={star2} className={styles.star} />
                </div>
                <div className={styles.img_container}>
                    <img src={phone}  />
                </div>
                <div className={styles.heart_container}>
                    <img src={heart}  />
                </div>
                <div className={styles.title_container}>
                    <div className={styles.isAvilableProduct}>
                        <img src={checked} />
                        <span>В наличии</span>
                    </div>
                    <div className={styles.price}>
                        <h2 style={{ marginBottom: "0" }}>91 500 сом</h2>
                    </div>
                    <div className={styles.title}>
                        <h2>Смартфон GALAXY Z FLIP5 5G 8/256GB</h2>
                        <p>iГарантия от производителя в официальных СЦ на территории РФ.Galaxy Z F.....</p>
                    </div>
                </div>
                <div className={styles.btn_container}>
                    <button className={styles.btn}>
                        <a href="#">Быстрый заказ</a>
                    </button>
                    <img src={shop} alt="" />
                </div>
                <div className={styles.options_container}>
                    <h2>Цвет</h2>
                    <img src={black} alt="" />
                    <img src={white} alt="" />
                    <img src={lightBrown} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewProductsCard