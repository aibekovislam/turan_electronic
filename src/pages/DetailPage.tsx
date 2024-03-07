import SldierDetail from "../components/SliderDetail"
import styles from "../styles/detail.module.scss"
// import white from "../assets/svgs/detail/white.svg"
// import black from "../assets/svgs/detail/black.svg"
// import lighBrown from "../assets/svgs/detail/lightBrown.svg"
// import star2 from "../assets/svgs/card/star2:5.svg"
import heart from "../assets/svgs/card/Vector (8).svg"
import reviews from '../assets/svgs/detail/Rates.svg'
import star4 from '../assets/svgs/detail/star4:5.svg'
import { useEffect, useState } from "react"
import Brands from "../components/Brands"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootStates } from "../store/store"
import { calculateDiscountedPrice } from "../functions/calculateDiscounte"
import { fetchOneProducts } from "../store/features/products/oneProductSlice"


function DetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const product = useSelector((state: RootStates) => state.oneProduct.product);
    const firstImage = Object.values(product?.product_images || {})[0]?.[0]?.[0] || null;

    const [activeItem, setActiveItem] = useState<string | undefined>(product?.memory[0]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setActiveItem(product?.memory[0]);
    }, [product]);

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };    
    const [colorPicked, setColorPicked] = useState(firstImage);

    if (id) {
        useEffect(() => {
          dispatch(fetchOneProducts(+id))
        }, [dispatch, id])
    }

    const handleColorPick = (color: any) => {
        setColorPicked(color);
    }

    useEffect(() => {
        const defaultColor: any = product?.color?.[0]; 
        if (defaultColor) {
          setColorPicked(defaultColor);
        }
      }, [product]);
    
    const toggleDescription = () => {
        setExpanded(!expanded);
    };

  return (
    <div>
        <div className={styles.detail_main}>
            <div className={styles.section_title}>
                <div>Главная | Каталог | Iphone | Ipnone 14 Pro max</div>
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
                            { product?.memory.map((item: string, index: number) => (
                                <li
                                    key={index}
                                    className={`${styles.navigation__item} ${
                                        activeItem === "256" ? styles.active__navbar : ""
                                    }`}
                                    onClick={() => handleItemClick("256")}
                                    >
                                    <a href="#" >
                                        { item }gb
                                    </a>
                                </li>
                            )) } 
                        </ul>
                    </div>
                    <div className={styles.price}>
                        {<div>{ calculateDiscountedPrice(product?.price, product?.discount) } сом</div>}
                    </div>
                    <div className={styles.utils}>
                        <button className={styles.btn}>
                            <a href="#">В корзину</a>
                        </button>
                        <img className={styles.detail_img} src={heart}  />
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
                <div className={styles.reviews_button}>
                    <img src={reviews} className={styles.reviews__svg} alt="" />
                    <input type="button"  value="Написать отзыв"/>
                </div>
                <div className={styles.reviews}>
                    <div className={styles.reviews_content}>
                        <div className={styles.reviews_header}>
                            <div className={styles.reviews_name}>
                                <div>Айгерим Атамбекова</div>
                                <img src={star4}  />
                            </div>
                            <div className={styles.reviews_date}>
                                <span>02.02.2024</span>
                            </div>
                        </div>
                        <div className={styles.reviews_description}>
                            <p>Заказала долгожданный свой Iphone на этом сайте, спасибо большое у вас цены всегда ниже, чем в других местах. Заказ пришел вовремя, Успехов Вам всегда!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Brands/>
    </div>
    )
}

export default DetailPage