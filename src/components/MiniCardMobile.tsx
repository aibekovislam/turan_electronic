import styles from "../styles/card.module.scss"
import shop from "../assets/svgs/card/shop.svg"


function MiniCardMobile({ accessories, onClick, }: any) {
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
                    <img src={accessories.default_image} alt="" />
                    <span>{accessories.name.slice(0, 30)}{ accessories.name.length > 30 ? "..." : "" }</span>
                </div>
                <div className={styles.mini_mobile__utils}>
                    <span>{accessories.price} сом</span>
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