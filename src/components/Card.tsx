import styles from "../styles/card.module.scss"
// import star2 from "../assets/svgs/card/star2:5.svg"
// import black from "../assets/svgs/card/black.svg"
// import white from "../assets/svgs/card/white.svg"
// import lightBrown from "../assets/svgs/card/lightBrrown.svg"
import shop from "../assets/svgs/card/shop.svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
// import phone from "../assets/card/Phone.png"
import React from "react"
import { CardProps } from "../utils/interfacesAndTypes"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"

const Card: React.FC<CardProps> = ({ type, product }) => {      
    return (
        <div className={styles.card_main}>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.star_container}>
                        <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{ cursor: 'pointer', color: star <= product.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray', marginRight: "5px" }}
                                    >
                                &#9733;
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.img_container}>
                        <img src={product.default_image}  />
                    </div>
                    <div className={styles.heart_container}>
                        <img src={type === "recommendation_card" ? heart : fillHeart}  />
                    </div>
                    <div className={styles.title_container}>
                        <div className={styles.price}>
                            <h2>{ calculateDiscountedPrice(product.price, product.discount) } сом</h2>
                            <h3>{ product.price } сом</h3>
                        </div>
                        <div className={styles.discount}>
                            <div>
                                -{ product.discount }%
                            </div>
                            <div>
                                экономия { product.price - calculateDiscountedPrice(product.price, product.discount) } сом
                            </div>
                        </div>
                        <div className={styles.title}>
                            <h2>{ product.name }</h2>
                            <p>{ product.description.slice(0, 130) }</p>
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
                        { product.color.map((item: any, index) => (
                            <div key={index} className={styles.color_block} style={{ background: item }}></div>
                        )) }
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Card