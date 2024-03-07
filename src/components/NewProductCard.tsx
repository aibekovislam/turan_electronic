import styles from "../styles/card.module.scss"
// import black from "../assets/svgs/card/black.svg"
// import white from "../assets/svgs/card/white.svg"
// import lightBrown from "../assets/svgs/card/lightBrrown.svg"
import shop from "../assets/svgs/card/shop.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import checked from "../assets/svgs/card/Vector (9).svg";
import { ProductsType } from "../utils/interfacesAndTypes"

function NewProductsCard({ product, onClick }: { product: ProductsType, onClick: (func: any) => void }) {
  return (
    <div className={`${styles.card_main} ${styles.card_main_mobile}`} onClick={onClick}>
        <div className={styles.card_container}>
            <div className={styles.card}>
                <div className={styles.star_container}>
                    { product.is_arrived ? (
                        <div className={styles.new_productCard_label}>
                            Новое
                        </div>
                    ) : null}
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
                    <img src={heart}  />
                </div>
                <div className={styles.title_container}>
                    { product.in_stock ? (
                        <div className={styles.isAvilableProduct}>
                            <img src={checked} />
                            <span>В наличии</span>
                        </div>
                    ) : (
                        <div style={{ color: "brown" }}>Нет в наличии</div>
                    ) }
                    <div className={styles.price}>
                        <h2 style={{ marginBottom: "0" }}>{ product.price } сом</h2>
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

export default NewProductsCard