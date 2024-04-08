import styles from "../styles/card.module.scss"
import shop from "../assets/svgs/card/shop.svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import React, { useEffect, useState } from "react"
import { CardProps } from "../utils/interfacesAndTypes"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"
import { addFavorites } from "../store/features/favorite_and_cart/favoriteSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { useNavigate } from "react-router-dom"
import { notify, notifyError } from "./Toastify"
import { API_URL } from "../utils/consts"
import checked from "../assets/svgs/card/Vector (9).svg";
import 'ldrs/ring';
import { ping } from 'ldrs'
import { addToCart } from "../store/features/favorite_and_cart/cartSlice"


const Card: React.FC<CardProps> = ({ product, onClick }) => {
    const [loaded, setLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const [favoriteLoaded, setFavoriteLoad] = useState(false);
    const navigate = useNavigate();
    const [colorPicked, setColorPicked] = useState("");
    const favorites = useSelector((state: RootStates) => state.favorites.favorites);
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const tokenString = localStorage.getItem("tokens");
    const token = tokenString ? JSON.parse(tokenString) : null;
    const dispatch = useDispatch<any>();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

    ping.register();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 520);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setLoaded(true);
    }, [product])

    const handleClickFavorite = (product_id: number) => {
        if (!token) {
            navigate("/auth")
            notifyError('Вы не авторизованы')
            return;
        }
    
        if (user && token) {
            if (product.in_favorite) {
                return;
            }
            
            setFavoriteLoad(true);
            dispatch(addFavorites(product_id))
        }
    }    

    const handleColorPick = (color: string) => {
        if (color === colorPicked) {
            setImgLoaded(false);
        } else {
            setImgLoaded(true);
        }
        setColorPicked(color);
    };

    function filterImagesByColor(images: string[], color: string) {
        if (color !== "") {
            return images[0]
        }
    }

    useEffect(() => {
        setFavoriteLoad(false);
    }, [favorites])

    const filteredImages = colorPicked ? filterImagesByColor(product.product_images[colorPicked], colorPicked) : null;

    if (loaded) {
        return (
            isMobile ? (
                <div className={styles.cardMobile_main} onClick={() => onClick(product.id)}>
                    <div className={styles.cardMobile_container}>
                        <div className={styles.cardMobile_}>
                            <div className={styles.cardMobile_rate}>
                                {product.is_arrived ? (
                                    <div className={styles.new_productCard_label}>
                                        Новое
                                    </div>
                                ) : null}
                                <div className={styles.rating_mobile}>
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
                            <div className={styles.cardMobile_info}>
                                <div className={styles.cardMobile_wrapper__left}>
                                    <img src={product.default_image} onClick={() => onClick(product.id)} />
                                    {favoriteLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}><l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping></div>}
                                    <img style={{ display: favoriteLoaded ? "none" : "block", cursor: "pointer" }} src={product.in_favorite ? fillHeart : heart} onClick={(e) => {
                                        e.stopPropagation();
                                        handleClickFavorite(product.id);
                                    }} />
                                </div>
                                <div className={styles.cardMobile_wrapper__right}>
                                    <div className={styles.cardMobile_title} onClick={() => onClick(product.id)}>
                                        {product.name}
                                    </div>
                                    <div className={styles.cardMobile_colors}>
                                        <span>Цвет</span>
                                        {product?.color !== undefined ? product?.color.map((item: any, index: number) => (
                                            <div key={index} className={styles.mobile_color_block} style={{ background: item.hash_code }}></div>
                                        )) : (
                                            <div>Loading...</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.right__special}>
                                {product.in_stock ? (
                                    <div className={styles.isAvilableProduct}>
                                        <img src={checked} />
                                        <span>В наличии</span>
                                    </div>
                                ) : (
                                    <div style={{ color: "brown" }}>Нет в наличии</div>
                                )}
                                <div className={styles.price_mobile}>
                                    {product.price} сом
                                    <div className={styles.bag__mobile} onClick={() => {
                                        console.log(product.memory ? product.memory[0]?.id : 13)
                                        dispatch(addToCart(product.id, product.color[0]?.id, 1, product.memory_price ? product.memory[0]?.id : 13, product.price))
                                        notify(`Вы успешно добавили в корзину ${product.name}`)
                                    }}>
                                        <img src={shop} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.card_main}>
                    <div className={styles.card_container}>
                        <div className={styles.card}>
                            <div className={styles.star_container}>
                                {product.is_arrived ? (
                                    <div className={styles.new_productCard_label}>
                                        Новое
                                    </div>
                                ) : null}
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
                                {imgLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "190px" }}>
                                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                    Загрузка...
                                </div>}
                                {filteredImages ? (
                                    <img src={API_URL + filteredImages} onLoad={() => setImgLoaded(false)} style={{ display: imgLoaded ? "none" : "block" }} />
                                ) : (
                                    <img src={product.default_image} onLoad={() => setImgLoaded(false)} style={{ display: imgLoaded ? "none" : "block" }} />
                                )}
                            </div>
                            <div className={styles.heart_container}>
                                {favoriteLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}><l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping></div>}
                                <img
                                    src={product.in_favorite ? fillHeart : heart}
                                    onClick={() => {
                                        handleClickFavorite(product.id);
                                    }}
                                    style={{ display: favoriteLoaded ? "none" : "block" }}
                                />
                            </div>
                            <div className={styles.title_container}>
                                <div className={styles.price}>
                                    <h2>{product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price} сом</h2>
                                    {product.discount !== 0 && <h3>{product.price} сом</h3>}
                                </div>
                                <div className={styles.discount}>
                                    {product?.discount !== 0 && (
                                        <>
                                            <div>
                                                -{product.discount}%
                                            </div>
                                            <div>
                                                экономия {product.price - calculateDiscountedPrice(product.price, product.discount)} сом
                                            </div>
                                        </>
                                    )
                                    }
                                </div>
                                <div onClick={() => onClick(product.id)} className={styles.title}>
                                    <h2>{product.name}</h2>
                                    <p>{product?.description !== undefined ? product?.description.slice(0, 35) + "..." : ""}</p>
                                </div>
                            </div>
                            <div className={styles.btn_and_options}>
                                <div className={styles.btn_container}>
                                    <button className={styles.btn} onClick={() => navigate(`/product/${product.id}`)}>
                                        <a href="#">Быстрый заказ</a>
                                    </button>
                                    <img src={shop} alt="" onClick={() => navigate(`/product/${product.id}`)} />
                                </div>
                                <div className={styles.options_container}>
                                    <h2>Цвет</h2>
                                    {product?.color !== undefined ? product?.color.map((item: any, index: number) => (
                                        <div key={index} className={styles.color_block} style={{ background: item.hash_code }} onClick={() => handleColorPick(item.hash_code)}></div>
                                    )) : (
                                        <div>Loading...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default Card
