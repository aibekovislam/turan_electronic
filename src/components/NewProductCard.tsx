import styles from "../styles/card.module.scss"
// import black from "../assets/svgs/card/black.svg"
// import white from "../assets/svgs/card/white.svg"
// import lightBrown from "../assets/svgs/card/lightBrrown.svg"
import shop from "../assets/svgs/card/shop.svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import checked from "../assets/svgs/card/Vector (9).svg";
import { ProductsType } from "../utils/interfacesAndTypes"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { addFavorites, fetchFavorites } from "../store/features/favorite_and_cart/favoriteSlice";
import { useNavigate } from "react-router-dom";

function NewProductsCard({ product, onClick }: { product: ProductsType, onClick: (func: any) => void }) {
    const navigate = useNavigate();
    const favorites = useSelector((state: RootStates) => state.favorites.favorites);
    const user = useSelector((state: RootStates) => state.auth.user);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [])

    const handleClickFavorite = (product_id: number) => {
        if(user) {
            dispatch(addFavorites(product_id))
        } else if(!user) {
            navigate("/auth")
        }
    }

    const isProductInFavorites = favorites.some((fav) => fav.id === product.id);

    return (
    <div className={`${styles.card_main} ${styles.card_main_mobile}`}>
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
                <div className={styles.img_container} onClick={onClick}>
                    <img src={product.default_image}  />
                </div>
                <div className={styles.heart_container}>
                    <img src={isProductInFavorites ? fillHeart : heart} onClick={() => handleClickFavorite(product.id)} />
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
                    <button className={styles.btn} onClick={onClick}>
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