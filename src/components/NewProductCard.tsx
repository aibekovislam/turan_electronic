import styles from "../styles/card.module.scss"
import shop from "../assets/svgs/card/shop.svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import checked from "../assets/svgs/card/Vector (9).svg";
import { ProductsType } from "../utils/interfacesAndTypes"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import { addFavorites } from "../store/features/favorite_and_cart/favoriteSlice";
import { useNavigate } from "react-router-dom";
import { notifyError } from "./Toastify";
import { API_URL } from "../utils/consts";
import 'ldrs/ring';
import { ping } from 'ldrs'
import { calculateDiscountedPrice } from "../functions/calculateDiscounte";
import { useTranslation } from "react-i18next";

function NewProductsCard({ product, onClick }: { product: ProductsType, onClick: (func: any) => void }) {
    const navigate = useNavigate();
    const favorites = useSelector((state: RootStates) => state.favorites.favorites);
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
    const tokenString = localStorage.getItem("tokens");
    const token = tokenString ? JSON.parse(tokenString) : null;
    const [colorPicked, setColorPicked] = useState("");
    const [imgLoaded, setImgLoaded] = useState(false);
    const [favoriteLoaded, setFavoriteLoad] = useState(false);
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    ping.register();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 520);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dispatch = useDispatch<any>();

    const handleClickFavorite = (product_id: number) => {
        if (!token) {
            navigate("/auth")
            notifyError('Вы не авторизованы')
            return;
        }
    
        if (user && token) {
            setFavoriteLoad(true);
            dispatch(addFavorites(product_id))
        }
    }

    function filterImagesByColor(images: string[], color: string) {
        if (color !== "") {
            return images[0]
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

    useEffect(() => {
        setFavoriteLoad(false);
    }, [favorites])

    const filteredImages = colorPicked ? filterImagesByColor(product.product_images[colorPicked], colorPicked) : null;
    const isProductInFavorites = favorites.some((fav) => fav.id === product.id);

    return (
        isMobile ? (
            <div className={styles.cardMobile_main} onClick={() => onClick(product.id)}>
                <div className={styles.cardMobile_container}>
                    <div className={styles.cardMobile_}>
                        <div className={styles.cardMobile_rate}>
                            {product.is_arrived ? (
                                <div className={styles.new_productCard_label}>
                                    { t("new_label") }
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
                                <img src={`${product.default_image}`} onClick={() => onClick(product.id)} alt={`Купить ${product.name} в Бишкеке!`} title={`Купить ${product.name} в Бишкеке!`} />
                                {favoriteLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}><l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping></div>}
                                    <img style={{ display: favoriteLoaded ? "none" : "block", cursor: "pointer" }} src={isProductInFavorites ? fillHeart : heart} onClick={(e) => {
                                        e.stopPropagation();
                                        handleClickFavorite(product.id);
                                }} />
                            </div>
                            <div className={styles.cardMobile_wrapper__right}>
                                <div className={styles.cardMobile_title} onClick={() => onClick(product.id)}>
                                    {currentLanguage === "Русский" ? product.name : product.name_en}
                                </div>
                                <div className={styles.cardMobile_colors}>
                                    <span>{ t("color") }</span>
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
                                    <span>{ t("in_stock") }</span>
                                </div>
                            ) : (
                                <div style={{ color: "brown" }}>Нет в наличии</div>
                            )}
                            <div className={styles.price_mobile}>
                                {product.price} { t("sum") }
                                <div className={styles.bag__mobile}>
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
                                    { t("new_label") }
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
                                <img src={API_URL + filteredImages} onLoad={() => setImgLoaded(false)} style={{ display: imgLoaded ? "none" : "block" }} alt={`Купить ${product.name} в Бишкеке!`} title={`Купить ${product.name} в Бишкеке!`} />
                            ) : (
                                <img src={`${product.default_image}`} onLoad={() => setImgLoaded(false)} style={{ display: imgLoaded ? "none" : "block" }} alt={`Купить ${product.name} в Бишкеке!`} title={`Купить ${product.name} в Бишкеке!`} />
                            )}
                        </div>
                        <div className={styles.heart_container}>
                                {favoriteLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}><l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping></div>}
                                <img
                                    src={isProductInFavorites ? fillHeart : heart}
                                    onClick={() => {
                                        handleClickFavorite(product.id);
                                    }}
                                    style={{ display: favoriteLoaded ? "none" : "block" }}
                                />
                        </div>
                        <div className={styles.title_container}>
                            <div className={styles.price}>
                                <h2>{product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price} { t("sum") }</h2>
                                {product.discount !== 0 && <h3>{product.price} { t("sum") }</h3>}
                            </div>
                            <div className={styles.discount}>
                                {product?.discount !== 0 && (
                                    <>
                                        <div>
                                            -{product.discount}%
                                        </div>
                                        <div>
                                            экономия {product.price - calculateDiscountedPrice(product.price, product.discount)} { t("sum") }
                                        </div>
                                    </>
                                )
                                }
                            </div>
                            <div onClick={() => onClick(product.id)} className={styles.title}>
                                <h2>{currentLanguage === "Русский" ? product.name : product.name_en}</h2>
                                <p>{currentLanguage === "Русский" ? (product?.description !== undefined ? product?.description.slice(0, 35) + "..." : "") : (product?.description_en ? product?.description_en.slice(0, 35) + "..." : "")}</p>
                            </div>
                        </div>
                        <div className={styles.btn_and_options}>
                            <div className={styles.btn_container}>
                                <button className={styles.btn} onClick={() => navigate(`/product/${product.id}`)}>
                                    <a href="#">{ t("fast_order_btn") }</a>
                                </button>
                                <img src={shop} alt="" onClick={() => navigate(`/product/${product.id}`)} />
                            </div>
                            <div className={styles.options_container}>
                                <h2>{ t("color") }</h2>
                                {product?.color !== undefined ? product?.color.slice(0, 6).map((item: any, index: number) => (
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
}

export default NewProductsCard