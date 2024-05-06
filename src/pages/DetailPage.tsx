import SldierDetail from "../components/SliderDetail"
import styles from "../styles/detail.module.scss"
import heart from "../assets/svgs/card/Vector (8).svg"
import closeSvg from "../assets/svgs/detail/Vector (19).svg";
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import reviews from '../assets/svgs/detail/Rates.svg'
import { useEffect, useState } from "react"
import Brands from "../components/Brands"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"
import { colorPickToAddToCart, fetchOneProducts } from "../store/features/products/oneProductSlice"
import { addReview } from "../store/features/reviews/reviewSlice"
import { addToCart } from "../store/features/favorite_and_cart/cartSlice"
import { addFavorites } from "../store/features/favorite_and_cart/favoriteSlice"
import { notify, notifyError } from "../components/Toastify"
import 'ldrs/ring';
import { ping } from 'ldrs'
import { Rating } from 'react-simple-star-rating'
import { Helmet } from "react-helmet-async";
import { API_URL } from "../utils/consts";
import { useTranslation } from "react-i18next";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const product = useSelector((state: RootStates) => state.oneProduct.product);
    const firstImage = Object.values(product?.product_images || {})[0]?.[0]?.[0] || null;
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const tokenString = localStorage.getItem("tokens");
    const token = tokenString ? JSON.parse(tokenString) : null;
    const favorites = useSelector((state: RootStates) => state.favorites.favorites);
    const pickedColor = useSelector((state: RootStates) => state.oneProduct.pickedColor);
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language

    const [favoriteLoaded, setFavoriteLoad] = useState(false);
    const [activeItem, setActiveItem] = useState<any>("");
    const [openReviewInput, setOpenReviewInput] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [productPrice, setProductPrice] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
    const [visibleDiv, setVisibleDiv] = useState<null | 'div1' | 'div2' | 'div3'>('div1');

    ping.register()

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };
    const [colorPicked, setColorPicked] = useState(firstImage);
    const [colorID, setColorID] = useState(0);
    const [memoryID, setMemoryID] = useState(0);
    const [reviewStar] = useState(0);

    const numberedId = Number(id);

    const handleRating = (rate: number) => {
        setReviewData({ ...reviewData, rating: rate })
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 520);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchOneProducts(numberedId))
    }, [dispatch, id])

    useEffect(() => {
        if (product?.price) {
            setProductPrice(product.price)
        }
    }, [product])

    const handleColorPick = (color: any) => {
        setColorPicked(color.hash_code);
        if (product?.memory && product?.memory.length <= 0) {
            setActiveItem({ volume: "0" });
        }
        if(product?.prices.length !== 0) {
            const price_color = product?.prices.find((item: any) => {
                return item.product_color === color.hash_code;
            });
            dispatch(colorPickToAddToCart(price_color?.product_color));
        } else {
            dispatch(colorPickToAddToCart(color.hash_code));
            console.log(pickedColor, colorID);
            setColorID(color.id);
        }
    }

    const handleAddToCart = (id: number | undefined) => {
        if (product?.memory_price) {
            if (memoryID === 0) {
                notifyError("Выберите объем памяти");
                return;
            }
        }

        if (id !== undefined && user && activeItem !== undefined && token) {
            console.log(productPrice)
            dispatch(addToCart(id, colorID, 1, memoryID === 0 ? 13 : memoryID, productPrice));
            setAddedToCart(true);

            const addedProducts = JSON.parse(localStorage.getItem('addedProducts') || '[]');
            const updatedProducts = [...addedProducts, id];
            localStorage.setItem('addedProducts', JSON.stringify(updatedProducts));

            notify(`Вы добавили ${product?.name} в корзину`)
        } else if (!user || !token) {
            setAddedToCart(false);
            navigate("/auth");
            notifyError('Вы не авторизованы');
        }
    };

    useEffect(() => {
        const addedProducts = JSON.parse(localStorage.getItem('addedProducts') || '[]');
        const addedToCart = addedProducts.includes(product?.id);
        setAddedToCart(addedToCart);
    }, [product]);

    const handleClickFavorite = (product_id: number) => {
        if (user && token) {
            setFavoriteLoad(true);
            dispatch(addFavorites(product_id))
        } else if (!user || !token) {
            navigate("/auth");
            notifyError('Вы не авторизованы');
        }
    }

    const isProductInFavorites = favorites.some((fav) => fav.id === product?.id);

    useEffect(() => {
        const defaultColor: any = product?.color.length !== 0 ? product?.color?.[0].hash_code : "нету";
        if (defaultColor) {
            setColorPicked(defaultColor);
        }
        setColorID(product?.color.length !== 0 ? product?.color?.[0].id : "нету");
        dispatch(colorPickToAddToCart(defaultColor));
    }, [product]);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const [reviewData, setReviewData] = useState({
        text: "",
        rating: reviewStar,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReviewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(addReview({ ...reviewData, product: product?.id }));

        setReviewData(reviewData);
        setOpenReviewInput(false);
    };

    useEffect(() => {
        setFavoriteLoad(false);
    }, [favorites])

    function insertLineBreaks(text: string) {
        if (!text) return '';
    
        const lines = text.split('$');
        const formattedText = lines.join('<br/><br/>');
        return formattedText;
    }    

    useEffect(() => {
        if (activeItem) {
            if(product?.prices) {
                let transPrice = product.prices.filter((item: any) => {
                    return item.product_color === pickedColor
                })
                const colorAndMemoryPrice = transPrice.find((item: any) => {
                    if(item.memory) {
                        return item.memory === activeItem["volume"]
                    } else {
                        return { ...item }
                    }
                })
                if(colorAndMemoryPrice?.price !== undefined) {
                    if(colorAndMemoryPrice.memory) {
                        setProductPrice(colorAndMemoryPrice?.price)
                    } else {
                        setProductPrice(product.price)
                    }
                } else {
                    setProductPrice(product.price)
                }
                console.log(colorAndMemoryPrice, activeItem)
            } else {
                if(product?.price !== undefined) {
                    setProductPrice(product?.price)
                }
            }
        }
    }, [activeItem, pickedColor])

    console.log(product)

    return (
        <>
            <Helmet>
                <title>{`${product?.name}`} - Turan electronics интернет магазин электроники</title>
                <meta name="description" content="Turan Electronics - ваш источник качественной электроники по лучшим ценам! Мы предлагаем широкий ассортимент товаров, включая смартфоны, ноутбуки, планшеты, компьютеры, аудио- и видеотехнику, аксессуары и многое другое. У нас вы найдете только оригинальную продукцию от ведущих мировых брендов с гарантией качества. Будьте в курсе последних технологических новинок и современных решений в мире электроники с Turan Electronics. Покупайте онлайн с уверенностью, что ваше удовлетворение - наш приоритет. Откройте для себя удобство и безопасность онлайн-шопинга с нами прямо сейчас!"></meta>
                <link rel="canonical" href={`https://turanelectronics.kg/product/${product?.id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://turanelectronics.kg/product/${product?.id}`} />
                <meta property="og:title" content={`${product?.name} - купить по выгодной цене в интернет-магазине Turan electronics`}/>
                <meta property="og:description" content={`✅ ${product?.name} - в наличии в интернет-магазине Turan electronics! Самые выгодные цены на смартфоны! ✔ Характеристики ✔ Фото ✔ Ассортимент ✔ Отзывы ✔ Гарантия ✔ Рассрочка! Доставка 🚚`}/>
                <meta property="og:image" content={`${API_URL}/${product?.default_image?.slice(16)}`} />
                <meta data-hid="property::og:site_name" property="og:site_name" content="TuranElectronics"/>
            </Helmet>
            <section>
                {isMobile ? (
                    <div className={styles.mobile_detail__main}>
                        {product && product?.id === numberedId ? (
                            <div className={styles.mobile_detail__container}>
                                <div className={styles.mobile_detail}>
                                    <div className={styles.section_title}>
                                        <div className={styles.path}>
                                            <a href="/">Главная</a> | <a href="/recommendation/products">Каталог</a> | <a href={`/products/brands/${product.brand}`}>{product?.brand_category_title}</a> | <a>{product?.name}</a>
                                        </div>
                                    </div>
                                    <div className={styles.mobile_detail__title}>
                                        <div>
                                            {currentLanguage === "Русский" ? product.name : product.name_en}
                                        </div>
                                        <div className={styles.stars}>
                                            {product?.rating != undefined ? (
                                                [1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: star <= product.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
                                                            marginRight: '5px',
                                                        }}
                                                    >
                                                        &#9733;
                                                    </span>
                                                ))
                                            ) : (
                                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                            )}
                                        </div>

                                    </div>
                                    <div className={styles.slider_main}>
                                        <SldierDetail img_array={product?.product_images} default_image={product?.default_image} selectedColor={colorPicked} />
                                    </div>
                                    <div className={styles.mobile_detail__util}>
                                        <div className={styles.options}>
                                            <div>{ product?.color.length !== 0 ? "Выбрать цвет" : "" }</div>
                                            {product?.color ? (
                                                product?.color.map((item: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.color_block} ${colorPicked === item.hash_code ? styles.selectedColor : ""}`}
                                                        style={{ background: item.hash_code ? item.hash_code : "" }}
                                                        onClick={() => handleColorPick(item)}
                                                    ></div>
                                                ))
                                            ) : (
                                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                            )}
                                        </div>
                                        {favoriteLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}><l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping></div>}
                                        <img
                                            className={styles.detail_img}
                                            src={isProductInFavorites ? fillHeart : heart}
                                            onClick={() => {
                                                handleClickFavorite(product.id || 0);
                                            }}
                                            style={{ display: favoriteLoaded ? "none" : "block", cursor: "pointer" }}
                                        />
                                    </div>
                                    <div className={styles.storage}>
                                        {product.memory_price ? (
                                            <div>Память</div>
                                        ) : (
                                            null
                                        )}
                                        <ul className={styles.navigation}>
                                            {product?.memory?.map((item: any, index: number) => (
                                                <li
                                                    key={index}
                                                    className={`${styles.navigation__item} ${activeItem === item ? styles.active__navbar : ""}`}
                                                    onClick={() => {
                                                        handleItemClick(item);
                                                        setMemoryID(item.id)
                                                    }}
                                                >
                                                    {item.volume}ГБ
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.price}>
                                        {
                                            productPrice !== 0 ? (
                                                <div>{calculateDiscountedPrice(productPrice ? productPrice : product.price, product.discount)} сом</div>
                                            ) : (
                                                <div style={{ color: "red" }}>Нет в наличии</div>
                                            )
                                        }
                                    </div>
                                    <div className={styles.mobile_detail__button}>
                                        { productPrice !== 0 ? (
                                            <button className={`${styles.btn} ${addedToCart ? styles.added_btn : ""}`} onClick={() => handleAddToCart(product?.id)} style={{ cursor: "pointer" }}>
                                                <a href="#">{addedToCart ? "Добавлено в корзину" : "В корзину"}</a>
                                            </button>
                                        ) : (
                                            null
                                        ) }
                                    </div>
                                    <div className={styles.mobile_detail_info}>
                                        <button onClick={() => setVisibleDiv("div1")} className={visibleDiv === "div1" ? styles.selected_btn : styles.option_btn}>Характеристика</button>
                                        <button onClick={() => setVisibleDiv("div2")} className={visibleDiv === "div2" ? styles.selected_btn : styles.option_btn}>Описание</button>
                                        <button onClick={() => setVisibleDiv("div3")} className={visibleDiv === "div3" ? styles.selected_btn : styles.option_btn}>Отзыв</button>
                                    </div>
                                    <div>
                                        {visibleDiv === "div1" ? (
                                            <div className={styles.сharacteristics}>
                                                <table>
                                                    <tbody>
                                                        {product?.characteristics ? (
                                                            Object.entries(product.characteristics).map(([key, value], index) => (
                                                                <tr key={index}>
                                                                    <th>
                                                                        <span className={styles.dots__details_span}>
                                                                            <span>{key}</span>
                                                                        </span>
                                                                    </th>
                                                                    <td>{value}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : visibleDiv === "div2" ? (
                                            <div className={styles.description}>
                                                <div>{ t("detail") }</div>
                                                <p>
                                                    {expanded ? 
                                                        <div dangerouslySetInnerHTML={{ __html: insertLineBreaks(currentLanguage === "Русский" ? product?.description : (product.description_en ? (product?.description_en) : "")) }}></div> :
                                                        <div dangerouslySetInnerHTML={{ __html: insertLineBreaks(currentLanguage === "Русский" ? product?.description?.slice(0, 100) : (product.description_en ? product.description_en : "")) + '...' }}></div>
                                                    }
                                                    <span className={styles.open_des_func} onClick={toggleDescription}>
                                                        {expanded ? "Свернуть" : "Развернуть"}
                                                    </span>
                                                </p>
                                            </div>
                                        ) : visibleDiv === "div3" ? (
                                            <>
                                                {openReviewInput ? (
                                                    <div className={styles.modal}>
                                                        <div className={styles.modalContent}>
                                                            <div className={styles.modal_text}>
                                                                { t("write_review") }
                                                                <img src={closeSvg} onClick={() => setOpenReviewInput(false)} />
                                                            </div>
                                                            <div className={styles.user_info}>
                                                                <span>{ t("input_name") }</span>
                                                                <div>{user.name}</div>
                                                            </div>
                                                            <form className={styles.add_review} onSubmit={handleSubmit}>
                                                                <div className={styles.rating_block}>
                                                                    Оцените товар
                                                                    <Rating onClick={handleRating} initialValue={reviewStar} SVGclassName={styles.svg_rating} />
                                                                </div>
                                                                <div className={styles.review_input_block}>
                                                                    <span>Отзыв</span>
                                                                    <input
                                                                        type="text"
                                                                        name="text"
                                                                        value={reviewData.text}
                                                                        onChange={handleChange}
                                                                        className={styles.review_text}
                                                                    />
                                                                </div>
                                                                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                                    <button className={styles.add_review_btn} type="submit">{ t("send") }</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {user && token ? (
                                                            <div className={styles.reviews_button} onClick={() => setOpenReviewInput(true)}>
                                                                <img src={reviews} className={styles.reviews__svg} alt="" />
                                                                <input type="button" value="Написать отзыв" />
                                                            </div>
                                                        ) : null}
                                                    </>
                                                )}
                                                {
                                                        <div className={styles.reviews}>
                                                            {product.reviews?.map((reviewItem, index) => (
                                                                <div className={styles.reviews_content} key={index}>
                                                                    <div className={styles.reviews_header}>
                                                                        <div className={styles.reviews_name} style={{ gap: "5px" }}>
                                                                            <div style={{ marginRight: "10px" }}>{reviewItem.user_name}</div>
                                                                            {reviewItem?.rating != undefined ? (
                                                                                [1, 2, 3, 4, 5].map((star) => (
                                                                                    <span
                                                                                        key={star}
                                                                                        style={{
                                                                                            cursor: 'pointer',
                                                                                            color: star <= reviewItem.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
                                                                                        }}
                                                                                    >
                                                                                        &#9733;
                                                                                    </span>
                                                                                ))
                                                                            ) : (
                                                                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                                                            )}
                                                                        </div>
                                                                        <div className={styles.reviews_date}>
                                                                            <span>{
                                                                                new Intl.DateTimeFormat("ru-RU", {
                                                                                    year: "numeric",
                                                                                    month: "numeric",
                                                                                    day: "numeric",
                                                                                }).format(new Date(reviewItem.created_at))}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className={styles.reviews_description}>
                                                                        <p>{reviewItem.text}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                }

                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.loader}>
                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {product && product?.id === numberedId ? (
                            <div itemScope itemType="https://schema.org/Product">
                                <div className={styles.detail_main}>
                                    <div className={styles.section_title}>
                                        <div className={styles.path}>
                                            <a href="/">{ t("home") }</a> | <a href={`/products/brands/${product.brand}`}>{ product.brand_title }</a> | <a href={`/products/filter/${product.brand_category}/${product.brand}`}>{product?.brand_category_title}</a> | {product?.name}
                                        </div>
                                    </div>
                                    <div className={styles.detail_container}>
                                        <div className={styles.detail_wrapper__left}>
                                            <div className={styles.slider_main}>
                                                <SldierDetail img_array={product?.product_images} default_image={product?.default_image} selectedColor={colorPicked} />
                                            </div>
                                            <div className={styles.options}>
                                                <div>{ product?.color.length !== 0 ? "Выбрать цвет" : "" }</div>
                                                {product?.color ? (
                                                    product?.color.map((item: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className={`${styles.color_block} ${colorPicked === item.hash_code ? styles.selectedColor : ""}`}
                                                            style={{ background: item.hash_code ? item.hash_code : "" }}
                                                            onClick={() => handleColorPick(item)}
                                                        ></div>
                                                    ))
                                                ) : (
                                                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                                )}
                                            </div>
                                            <div className={styles.description}>
                                                <div>{ t("detail") }</div>
                                                <p itemProp="description">
                                                    {expanded ? 
                                                        <div dangerouslySetInnerHTML={{ __html: insertLineBreaks(currentLanguage === "Русский" ? product?.description : (product.description_en ? (product?.description_en) : "")) }}></div> :
                                                        <div dangerouslySetInnerHTML={{ __html: insertLineBreaks(currentLanguage === "Русский" ? product?.description?.slice(0, 100) : (product.description_en ? product.description_en : "")) + '...' }}></div>
                                                    }
                                                    <span className={styles.open_des_func} onClick={toggleDescription}>
                                                        {expanded ? "Свернуть" : "Развернуть"}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div></div>
                                        <div className={styles.detail_wrapper__right}>
                                            <div className={styles.stars}>
                                                {product?.rating != undefined ? (
                                                    [1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            style={{
                                                                cursor: 'pointer',
                                                                color: star <= product.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
                                                                marginRight: '5px',
                                                            }}
                                                        >
                                                            &#9733;
                                                        </span>
                                                    ))
                                                ) : (
                                                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                                )}
                                            </div>
                                            <div className={styles.title}>
                                                <h1 itemProp="name">{ currentLanguage === "Русский" ? product.name : product.name_en }</h1>
                                            </div>
                                            <div className={styles.storage}>
                                                {product.memory_price ? (
                                                    <div>{ t("memory") }</div>
                                                ) : (
                                                    null
                                                )}
                                                <ul className={styles.navigation}>
                                                    {product?.memory?.map((item: any, index: number) => (
                                                        <li
                                                            key={index}
                                                            className={`${styles.navigation__item} ${activeItem === item ? styles.active__navbar : ""}`}
                                                            style={{ marginRight: "10px" }}
                                                            onClick={() => {
                                                                handleItemClick(item);
                                                                setMemoryID(item.id)
                                                            }}
                                                        >
                                                            {item.volume} {t("gb")}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className={styles.price} itemScope itemType="https://schema.org/Offer" itemProp="offers">
                                                {
                                                    productPrice !== 0 ? (
                                                        <div itemProp="price">{calculateDiscountedPrice(productPrice ? productPrice : product.price, product.discount)} <span itemProp="priceCurrency">сом</span></div>
                                                    ) : (
                                                        <div style={{ color: "red" }} >Нет в наличии</div>
                                                    )
                                                }
                                            </div>
                                            <div className={styles.utils}>
                                                { productPrice !== 0 ? (
                                                    <button className={`${styles.btn} ${addedToCart ? styles.added_btn : ""}`} onClick={() => handleAddToCart(product?.id)} style={{ cursor: "pointer" }}>
                                                        <a href="#">{addedToCart ? "Добавлено в корзину" : "В корзину"}</a>
                                                    </button>
                                                ) : (
                                                    null
                                                ) }
                                                {favoriteLoaded && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "auto" }}><l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping></div>}
                                                <img
                                                    className={styles.detail_img}
                                                    src={isProductInFavorites ? fillHeart : heart}
                                                    onClick={() => {
                                                        handleClickFavorite(product.id || 0);
                                                    }}
                                                    style={{ display: favoriteLoaded ? "none" : "block", cursor: "pointer" }}
                                                />
                                            </div>
                                            <div className={styles.сharacteristics}>
                                                <div className={styles.сharacteristics_title}>
                                                    <div>Характеристики:</div>
                                                </div>
                                                <table>
                                                    <tbody>
                                                        {product?.characteristics ? (
                                                            Object.entries(product.characteristics).map(([key, value], index) => (
                                                                <tr key={index}>
                                                                    <th>
                                                                        <span className={styles.dots__details_span}>
                                                                            <span>{key}</span>
                                                                        </span>
                                                                    </th>
                                                                    <td>{value}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.reviews_container}>
                                        {openReviewInput ? (
                                            <div className={styles.modal}>
                                                <div className={styles.modalContent}>
                                                    <div className={styles.modal_text}>
                                                        Написать отзыв
                                                        <img src={closeSvg} onClick={() => setOpenReviewInput(false)} />
                                                    </div>
                                                    <div className={styles.user_info}>
                                                        <span>Ваше имя</span>
                                                        <div>{user.name}</div>
                                                    </div>
                                                    <form className={styles.add_review} onSubmit={handleSubmit}>
                                                        <div className={styles.rating_block}>
                                                            Оцените товар
                                                            <Rating onClick={handleRating} initialValue={reviewStar} SVGclassName={styles.svg_rating} />
                                                        </div>
                                                        <div className={styles.review_input_block}>
                                                            <span>Отзыв</span>
                                                            <input
                                                                type="text"
                                                                name="text"
                                                                value={reviewData.text}
                                                                onChange={handleChange}
                                                                className={styles.review_text}
                                                            />
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: "100%" }}>
                                                            <button className={styles.add_review_btn} type="submit">Отправить</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {user && token ? (
                                                    <div className={styles.reviews_button} onClick={() => setOpenReviewInput(true)}>
                                                        <img src={reviews} className={styles.reviews__svg} alt="" />
                                                        <input type="button" value="Написать отзыв" />
                                                    </div>
                                                ) : null}
                                            </>
                                        )}
                                            <div className={styles.reviews}>
                                                {product.reviews?.map((reviewItem, index) => (
                                                    <div className={styles.reviews_content} key={index}>
                                                        <div className={styles.reviews_header}>
                                                            <div className={styles.reviews_name} style={{ gap: "5px" }}>
                                                                <div style={{ marginRight: "10px" }}>{reviewItem.user_name}</div>
                                                                {reviewItem?.rating != undefined ? (
                                                                    [1, 2, 3, 4, 5].map((star) => (
                                                                        <span
                                                                            key={star}
                                                                            style={{
                                                                                cursor: 'pointer',
                                                                                color: star <= reviewItem.rating ? 'rgba(255, 115, 0, 0.848)' : 'gray',
                                                                            }}
                                                                        >
                                                                            &#9733;
                                                                        </span>
                                                                    ))
                                                                ) : (
                                                                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                                                )}
                                                            </div>
                                                            <div className={styles.reviews_date}>
                                                                <span>{
                                                                    new Intl.DateTimeFormat("ru-RU", {
                                                                        year: "numeric",
                                                                        month: "numeric",
                                                                        day: "numeric",
                                                                    }).format(new Date(reviewItem.created_at))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className={styles.reviews_description}>
                                                            <p>{reviewItem.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                    </div>
                                </div>
                                <Brands />
                            </div>
                        ) : (
                            <div className={styles.loader}>
                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                            </div>
                        )}
                    </>
                )}
            </section>
        </>
    )
}

export default DetailPage