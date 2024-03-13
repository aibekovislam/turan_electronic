import SldierDetail from "../components/SliderDetail"
import styles from "../styles/detail.module.scss"
// import white from "../assets/svgs/detail/white.svg"
// import black from "../assets/svgs/detail/black.svg"
// import lighBrown from "../assets/svgs/detail/lightBrown.svg"
// import star2 from "../assets/svgs/card/star2:5.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import fillHeart from "../assets/svgs/card/fillHeart.svg"
import reviews from '../assets/svgs/detail/Rates.svg'
import { useEffect, useState } from "react"
import Brands from "../components/Brands"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"
import { fetchOneProducts } from "../store/features/products/oneProductSlice"
import { addReview, fetchReviews } from "../store/features/reviews/reviewSlice"
import { addToCart } from "../store/features/favorite_and_cart/cartSlice"
import { addFavorites } from "../store/features/favorite_and_cart/favoriteSlice"

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const product = useSelector((state: RootStates) => state.oneProduct.product);
    const firstImage = Object.values(product?.product_images || {})[0]?.[0]?.[0] || null;
    const user = useSelector((state: RootStates) => state.auth.user);
    const favorites = useSelector((state: RootStates) => state.favorites.favorites);

    const [activeItem, setActiveItem] = useState<string | undefined>("");
    const [ openReviewInput, setOpenReviewInput ] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [ addedToCart, setAddedToCart ] = useState(false);

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };    
    const [colorPicked, setColorPicked] = useState(firstImage);

    const numberedId = Number(id);

    if (id) {
        useEffect(() => {
          dispatch(fetchOneProducts(numberedId))
        }, [dispatch, id])
    }

    const handleColorPick = (color: any) => {
        setColorPicked(color);
    }

    const handleAddToCart = (id: number | undefined) => {
        if (id !== undefined && user) {
            dispatch(addToCart(id))
            setAddedToCart(true);
        } else if (!user) {
            setAddedToCart(false);
            navigate("/auth")
        }
    }    

    const handleClickFavorite = (product_id: number) => {
        if(user) {
            dispatch(addFavorites(product_id))
        } else if(!user) {
            navigate("/auth")
        }
    }

    const isProductInFavorites = favorites.some((fav) => fav.id === product?.id);

    useEffect(() => {
        const defaultColor: any = product?.color?.[0]; 
        if (defaultColor) {
          setColorPicked(defaultColor);
        }
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
    console.log(reviewData)
    setOpenReviewInput(false);
  };

    return (
        product !== undefined ? (
            <div>
                <div className={styles.detail_main}>
                    <div className={styles.section_title}>
                        <div>Главная | Каталог | { product?.brand_category_title } | { product?.name }</div>
                    </div>
                    <div className={styles.detail_container}>
                        <div className={styles.detail_wrapper__left}>
                            <div className={styles.slider_main}>
                                <SldierDetail img_array={product?.product_images} default_image={product?.default_image} selectedColor={colorPicked} />
                            </div>
                            <div className={styles.options}>
                                <div>Выбрать цвет</div>
                                {product?.color ? (
                                    product?.color.map((item: any, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.color_block} ${colorPicked === item ? styles.selectedColor : ""}`}
                                            style={{ background: item }}
                                            onClick={() => handleColorPick(item)}
                                        ></div>
                                    ))
                                ) : (
                                    <div>Loading...</div>
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
                                    <div>Loading...</div>
                                )}
                            </div>
                            <div className={styles.title}>
                                <div>{ product?.name }</div>
                            </div>
                            <div className={styles.storage}>
                                <div>Память</div>
                                <ul className={styles.navigation}>
                                    { product?.memory?.map((item: string, index: number) => (
                                        <li
                                            key={index}
                                            className={`${styles.navigation__item} ${activeItem === item ? styles.active__navbar : ""}`}
                                            style={{ marginRight: "10px" }}
                                            onClick={() => handleItemClick(item)}
                                        >
                                        {item}gb
                                    </li>
                                    )) } 
                                </ul>
                            </div>
                            <div className={styles.price}>
                                {<div>{ calculateDiscountedPrice(product?.price, product?.discount) } сом</div>}
                            </div>
                            <div className={styles.utils}>
                                <button className={`${styles.btn} ${ addedToCart ? styles.added_btn : "" }`} onClick={() => handleAddToCart(product?.id)} style={{ cursor: "pointer" }}>
                                    <a href="#">{ addedToCart ? "Добавлено в корзину" : "В корзину" }</a>
                                </button>
                                <img style={{ cursor: "pointer" }} onClick={() => {
                                    handleClickFavorite(product?.id || 0)
                                }} className={styles.detail_img} src={isProductInFavorites ? fillHeart : heart}  />
                            </div>
                            <div className={styles.сharacteristics}>
                                <div className={styles.сharacteristics_title}>
                                    <div>Характеристики:</div>
                                </div>
                                <table>
                                    {product?.characteristics ?  (
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
                                            <td>Loading...</td>
                                        </tr>
                                    )}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviews_container}>
                        { openReviewInput ? (
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
                            <div className={styles.reviews_button} onClick={() => setOpenReviewInput(true)}>
                                <img src={reviews} className={styles.reviews__svg} alt="" />
                                <input type="button"  value="Написать отзыв"/>
                            </div>
                        ) }
                        <div className={styles.reviews}>
                            { reviewsArray?.map((reviewItem, index) => (
                                <div className={styles.reviews_content} key={index}>
                                    <div className={styles.reviews_header}>
                                        <div className={styles.reviews_name} style={{ gap: "5px" }}>
                                            <div style={{ marginRight: "10px" }}>{ reviewItem.user_name }</div>
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
                                                    <div>Loading...</div>
                                                )}
                                            </div>
                                        <div className={styles.reviews_date}>
                                            <span>{ 
                                                new Intl.DateTimeFormat("ru-RU", {
                                                    year: "numeric",
                                                    month: "numeric",
                                                    day: "numeric",
                                                }).format(new Date(reviewItem.created_at)) }
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.reviews_description}>
                                        <p>{ reviewItem.text }</p>
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
                <Brands/>
            </div>
        ) : (
            <div>Loading...</div>
        )
    )
}

export default DetailPage