import SldierDetail from "../components/SliderDetail"
import styles from "../styles/detail.module.scss"
import white from "../assets/svgs/detail/white.svg"
import black from "../assets/svgs/detail/black.svg"
import lighBrown from "../assets/svgs/detail/lightBrown.svg"
import star2 from "../assets/svgs/card/star2:5.svg"
import heart from "../assets/svgs/card/Vector (8).svg"

import { useState } from "react"



function DetailPage() {
    const [activeItem, setActiveItem] = useState<string>("256");

    const handleItemClick = (item: string) => {
      setActiveItem(item);
    };

  return (
    <div className={styles.detail_main}>
        <div className={styles.section_title}>
            <div>Главная | Каталог | Iphone | Ipnone 14 Pro max</div>
        </div>
        <div className={styles.detail_container}>
            <div className={styles.detail_wrapper__left}>
                <div className={styles.slider_main}>
                    <SldierDetail/>
                </div>
                <div className={styles.options}>
                    <div>Выбрать цвет</div>
                    <img src={white}  />
                    <img src={black}  />
                    <img src={lighBrown}  />
                </div> 
                <div className={styles.description}>
                    <div>Описание</div>
                    <p>Смартфон iPhone 14 в корпусе цвета Gold со встроенной памятью 128 Гб оснащен экраном диагональю 6,1 дюйма, выполненным по технологии OLED. Дисплей типа Super Retina XDR обладает разрешением 2532x1170 пикселей. В этой модели установлен шестиядерный процессор А15 Bionic. В девайсе</p>
                </div>
            </div>
            <div className={styles.detail_wrapper__right}>
                <div className={styles.stars}>
                    <img src={star2} alt="" />
                </div>
                <div className={styles.title}>
                    <div>Apple IPhone 14 Pro Max </div>
                </div>
                <div className={styles.storage}>
                    <div>Память</div>
                    <ul className={styles.navigation}>
                        <li
                        className={`${styles.navigation__item} ${
                            activeItem === "256gb" ? styles.active__navbar : ""
                        }`}
                        onClick={() => handleItemClick("256gb")}
                        >
                        <a href="#" >
                            256gb
                        </a>
                        </li>
                        <li
                        className={`${styles.navigation__item} ${
                            activeItem === "512gb" ? styles.active__navbar : ""
                        }`}
                        onClick={() => handleItemClick("512gb")}
                        >
                        <a href="#" >
                            512gb
                        </a>
                        </li>
                        <li
                        className={`${styles.navigation__item} ${
                            activeItem === "1tb" ? styles.active__navbar : ""
                        }`}
                        onClick={() => handleItemClick("1tb")}
                        >
                        <a href="#" >
                            1tb
                        </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.price}>
                    <div>74500 сом</div>
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
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                        <tr>
                            <th>
                                <span className={styles.dots__details_span}>
                                    <span>Состав</span>
                                </span>
                            </th>
                            <td>Contact</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailPage