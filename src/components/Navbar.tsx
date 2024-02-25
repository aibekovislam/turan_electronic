import styles from "../styles/navbar.module.scss";
import logo_svg from "../assets/svgs/logo.svg";
import favorite_svg from "../assets/svgs/ic_outline-contact-support.svg";
import cart_svg from "../assets/svgs/Frame 53.svg";
import personal__office_svg from "../assets/svgs/Frame 52.svg";
import search_svg from "../assets/svgs/Button - Search → SVG.svg";
import border__img from "../assets/Frame 87.png";
import { useState } from "react";

function Navbar() {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item: any) => {
    setActiveItem(item);
  };

  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar__items}>
        <div className={styles.block_1}>
          <img src={border__img} alt="img" />
        </div>
        <div className={styles.block_2}>
          <div className={styles.logo}>
            <img src={logo_svg} alt="logo" />
          </div>
          <ul className={styles.navigation}>
            <li
              className={`${styles.navigation__item} ${
                activeItem === "home" ? styles.active_navbar : ""
              }`}
            >
              <a href="#" onClick={() => handleItemClick("home")}>
                Главная
              </a>
            </li>
            <li
              className={`${styles.navigation__item} ${
                activeItem === "categories" ? styles.active_navbar : ""
              }`}
            >
              <a href="#" onClick={() => handleItemClick("categories")}>
                Категории
              </a>
            </li>
            <li
              className={`${styles.navigation__item} ${
                activeItem === "news" ? styles.active_navbar : ""
              }`}
            >
              <a href="#" onClick={() => handleItemClick("news")}>
                Новости
              </a>
            </li>
            <li
              className={`${styles.navigation__item} ${
                activeItem === "about" ? styles.active_navbar : ""
              }`}
            >
              <a href="#" onClick={() => handleItemClick("about")}>
                О нас
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.block_3}>
          <div className={styles.tools__navbar}>
            <div className={`${styles.favorite} ${activeItem === "favorite" ? styles.active_navbar : ""}`} onClick={() => handleItemClick("favorite")}>
              <img src={favorite_svg} alt="Favorite svg" />
            </div>
            <div className={`${styles.cart} ${activeItem === "cart" ? styles.active_navbar : ""}`} onClick={() => handleItemClick("cart")}>
              <img src={cart_svg} alt="Cart svg" />
            </div>
            <div className={`${styles.personal_office} ${activeItem === "personal_office" ? styles.active_navbar : ""}`} onClick={() => handleItemClick("personal_office")}>
              <img src={personal__office_svg} alt="Personal svg" />
            </div>
          </div>
          <div className={`${styles.search__block} ${activeItem === "search__block" ? styles.active_navbar : ""}`} onClick={() => handleItemClick("search__block")}>
            <input type="text" placeholder="Поиск..." name="search" />
            <img src={search_svg} alt="search_svg" className={styles.search__svg} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;