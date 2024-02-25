import styles from "../styles/card.module.scss"
import star2 from "../assets/svgs/card/star2:5.svg"
import black from "../assets/svgs/card/black.svg"
import white from "../assets/svgs/card/white.svg"
import lightBrown from "../assets/svgs/card/lightBrrown.svg"
import shop from "../assets/svgs/card/shop.svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import phone from "../assets/card/Phone.png"

function Card() {
  return (
    <div className={styles.card_main}>
        <div className={styles.card_container}>
            <div className={styles.card}>
                <div className={styles.star_container}>
                    <img src={star2} className={styles.star} />
                </div>
                <div className={styles.img_container}>
                    <img src={phone}  />
                </div>
                <div className={styles.heart_container}>
                    <img src={fillHeart}  />
                </div>
                <div className={styles.title_container}>
                    <div className={styles.price}>
                        <h2>91 500 сом</h2>
                        <h3>105 700 сом</h3>
                    </div>
                    <div className={styles.discount}>
                        <div>
                            -5%
                        </div>
                        <div>
                            экономия 5 285 сом
                        </div>
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

export default Card