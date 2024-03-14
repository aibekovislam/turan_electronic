import styles from "../styles/card.module.scss"
// import star2 from "../assets/svgs/card/star2:5.svg"
// import black from "../assets/svgs/card/black.svg"
// import white from "../assets/svgs/card/white.svg"
// import lightBrown from "../assets/svgs/card/lightBrrown.svg"
import shop from "../assets/svgs/card/shop.svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
// import phone from "../assets/card/Phone.png"
import React, { useEffect, useState } from "react"
import { CardProps } from "../utils/interfacesAndTypes"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"
import { addFavorites, fetchFavorites } from "../store/features/favorite_and_cart/favoriteSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useNavigate } from "react-router-dom"
import { notify } from "./Toastify"

const Card: React.FC<CardProps> = ({ type, product, onClick }) => {  
    const [ loaded, setLoaded ] = useState(false);
    const navigate = useNavigate();
    const favorites = useSelector((state: RootStates) => state.favorites.favorites);
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;

    const dispatch = useDispatch<any>();

    useEffect(() => {
        setLoaded(true);
    }, [product])

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

    if(loaded) {
        return (
            <div className={styles.card_main}>
                <div className={styles.card_container}>
                    <div className={styles.card}>
                        <div className={styles.star_container}>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        style={{ color: star <= product.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray', marginRight: "5px" }}
                                        >
                                    &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.img_container} onClick={() => onClick(product.id)}>
                            <img src={product.default_image}  />
                        </div>
                        <div className={styles.heart_container}>
                            <img
                                src={isProductInFavorites ? fillHeart : heart}
                                onClick={() => {
                                handleClickFavorite(product.id);
                                }}
                            />
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
                                <p>{ product?.description !== undefined ? product?.description.slice(0, 130) + "..." : "" }</p>
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
                            { product?.color !== undefined ? product.color.map((item: any, index) => (
                                <div key={index} className={styles.color_block} style={{ background: item }}></div>
                            )) : (
                                <div>Loading...</div>
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Card