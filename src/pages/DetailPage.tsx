import SldierDetail from "../components/SliderDetail"
import styles from "../styles/detail.module.scss"
import heart from "../assets/svgs/card/Vector (8).svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import reviews from '../assets/svgs/detail/Rates.svg'
import { useEffect, useState } from "react"
import Brands from "../components/Brands"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"
import { colorPickToAddToCart, fetchOneProducts } from "../store/features/products/oneProductSlice"
import { addReview, fetchReviews } from "../store/features/reviews/reviewSlice"
import { addToCart } from "../store/features/favorite_and_cart/cartSlice"
import { addFavorites } from "../store/features/favorite_and_cart/favoriteSlice"
import { notifyError } from "../components/Toastify"
import 'ldrs/ring';
import { ping } from 'ldrs'

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

    const [favoriteLoaded, setFavoriteLoad] = useState(false);
    const [activeItem, setActiveItem] = useState<string | undefined>("");
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

    const numberedId = Number(id);

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
        dispatch(colorPickToAddToCart(color.hash_code));
        console.log(pickedColor)
        setColorID(color.id);
    }

    const handleAddToCart = (id: number | undefined) => {
        if (memoryID === 0) {
            notifyError("Выберите объем памяти");
            return;
        }

        if (id !== undefined && user && activeItem !== undefined) {
            dispatch(addToCart(id, colorID, 1, memoryID));
            setAddedToCart(true);
        } else if (!user) {
            setAddedToCart(false);
            navigate("/auth");
            notifyError('Вы не авторизованы');
        }
    };


    const handleClickFavorite = (product_id: number) => {
        if (user && token) {
            setFavoriteLoad(true);
            dispatch(addFavorites(product_id))
        } else if (!user) {
            navigate("/auth");
            notifyError('Вы не авторизованы');
        }
    }

    const isProductInFavorites = favorites.some((fav) => fav.id === product?.id);

    useEffect(() => {
        const defaultColor: any = product?.color?.[0].hash_code;
        if (defaultColor) {
            setColorPicked(defaultColor);
        }
        setColorID(product?.color?.[0].id);
        dispatch(colorPickToAddToCart(defaultColor));
    }, [product]);

    const toggleDescription = () => {
        setExpanded(!expanded);
    };

    const reviewsArray = useSelector((state: RootStates) => state.reviews.reviews);

    useEffect(() => {
        dispatch(fetchReviews())
    }, [dispatch]);

    const [reviewData, setReviewData] = useState({
        text: "",
        rating: 0,
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

    useEffect(() => {
        if (activeItem) {
            let price = product?.memory_price[(activeItem as any)["volume"]];
            let transPrice = price?.replace(/[^\d.]/g, '');
            if (transPrice) {
                setProductPrice(+transPrice);
            }
        }
    }, [activeItem])

    return (
        <div>
            {isMobile ? (
                <div className={styles.mobile_detail__main}>
                    {product && product?.id === numberedId ? (
                        <div className={styles.mobile_detail__container}>
                            <div className={styles.mobile_detail}>

                                <div className={styles.section_title}>
                                    <div>Главная | Каталог | {product?.brand_category_title} | {product?.name}</div>
                                </div>

                                <div className={styles.mobile_detail__title}>
                                    <div>
                                        Apple IPhone 14 Pro Max
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
                                        <div>Выбрать цвет</div>
                                        {product?.color ? (
                                            product?.color.map((item: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className={`${styles.color_block} ${colorPicked === item.hash_code ? styles.selectedColor : ""}`}
                                                    style={{ background: item.hash_code }}
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
                                    <div>Память</div>
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
                                    {<div>{calculateDiscountedPrice(productPrice, product.discount)} сом</div>}
                                </div>

                                <div className={styles.mobile_detail__button}>
                                    <button className={`${styles.btn} ${addedToCart ? styles.added_btn : ""}`} onClick={() => handleAddToCart(product?.id)} style={{ cursor: "pointer" }}>
                                        <a href="#">{addedToCart ? "Добавлено в корзину" : "В корзину"}</a>
                                    </button>
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
                                            <p>
                                                {expanded ? product?.description : `${product?.description?.slice(0, 100)}...`}
                                                <span className={styles.open_des_func} onClick={toggleDescription}>
                                                    {expanded ? "Свернуть" : "Развернуть"}
                                                </span>
                                            </p>
                                        </div>
                                    ) : visibleDiv === "div3" ? (
                                        reviewsArray.length !== 0 ? (
                                            <div className={styles.reviews}>
                                                {reviewsArray?.map((reviewItem, index) => (
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
                                        ) : (
                                            <div className={styles.reviews}>Пока нет отзывов</div>
                                        )
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
                        <div>
                            <div className={styles.detail_main}>
                                <div className={styles.section_title}>
                                    <div>Главная | Каталог | {product?.brand_category_title} | {product?.name}</div>
                                </div>
                                <div className={styles.detail_container}>
                                    <div className={styles.detail_wrapper__left}>
                                        <div className={styles.slider_main}>
                                            <SldierDetail img_array={product?.product_images} default_image={product?.default_image} selectedColor={colorPicked} />
                                        </div>
                                        <div className={styles.options}>
                                            <div>Выбрать цвет</div>
                                            {product?.color ? (
                                                product?.color.map((item: any, index: number) => (
                                                    <div
                                                        key={index}
                                                        className={`${styles.color_block} ${colorPicked === item.hash_code ? styles.selectedColor : ""}`}
                                                        style={{ background: item.hash_code }}
                                                        onClick={() => handleColorPick(item)}
                                                    ></div>
                                                ))
                                            ) : (
                                                <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                                            )}
                                        </div>
                                        <div className={styles.description}>
                                            <div>Описание</div>
                                            <p>
                                                {expanded ? product?.description : `${product?.description?.slice(0, 100)}...`}
                                                <span className={styles.open_des_func} onClick={toggleDescription}>
                                                    {expanded ? "Свернуть" : "Развернуть"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
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
                                            <div>{product?.name}</div>
                                        </div>
                                        <div className={styles.storage}>
                                            <div>Память</div>
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
                                                        {item.volume}ГБ
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className={styles.price}>
                                            {<div>{calculateDiscountedPrice(productPrice, product.discount)} сом</div>}
                                        </div>
                                        <div className={styles.utils}>
                                            <button className={`${styles.btn} ${addedToCart ? styles.added_btn : ""}`} onClick={() => handleAddToCart(product?.id)} style={{ cursor: "pointer" }}>
                                                <a href="#">{addedToCart ? "Добавлено в корзину" : "В корзину"}</a>
                                            </button>
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
                                        <form className={styles.add_review} onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                name="text"
                                                value={reviewData.text}
                                                onChange={handleChange}
                                            />
                                            <select
                                                className={styles.rating_add}
                                                name="rating"
                                                value={reviewData.rating}
                                                onChange={handleChange}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                            </select>
                                            <button type="submit">Отправить</button>
                                        </form>
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
                                    {reviewsArray.length !== 0 ? (
                                        <div className={styles.reviews}>
                                            {reviewsArray?.map((reviewItem, index) => (
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
                                    ) : (
                                        <div className={styles.reviews}>Пока нет отзывов</div>
                                    )}
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
        </div>
    )
}

export default DetailPage