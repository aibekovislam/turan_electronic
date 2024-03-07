import styles from "../styles/navbar.module.scss";
import logo_svg from "../assets/svgs/logo.svg";
import favorite_svg from "../assets/svgs/ic_outline-contact-support.svg";
import cart_svg from "../assets/svgs/Frame 53.svg";
import personal__office_svg from "../assets/svgs/Frame 52.svg";
import search_svg from "../assets/svgs/Button - Search → SVG.svg";
import border__img from "../assets/Frame 87.png";
import burger__menu from "../assets/svgs/Vector (16).svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [activeItem, setActiveItem] = useState<string>(() => {
    return localStorage.getItem("activeItem") || "home";
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    navigate(`/${item}`)
  };

  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar__items}>
        <div className={styles.block_1}>
          <img src={border__img} alt="img" />
        </div>
        <div className={styles.block_1_mobile}>
          <div className={styles.burgerMenu}>
            <img src={burger__menu} />
          </div>
          <div className={styles.searchMobile}>
            <img src={search_svg} />
          </div>
        </div>
        <div className={styles.block_2}>
          <div className={styles.logo}>
            <img src={logo_svg} alt="logo" />
          </div>
          <ul className={styles.navigation}>
            <li
              onClick={() => handleItemClick("home")}
              className={`${styles.navigation__item} ${
                activeItem === "home" ? "active__navbar" : ""
              }`}
            >
              <a href="home">
                Главная
              </a>
            </li>
            <li
              onClick={() => handleItemClick("categories")}
              className={`${styles.navigation__item} ${
                activeItem === "categories" ? "active__navbar" : ""
              }`}
            >
              <a href="#">
                Категории
              </a>
            </li>
            <li
              onClick={() => handleItemClick("news")}
              className={`${styles.navigation__item} ${
                activeItem === "news" ? "active__navbar" : ""
              }`}
            >
              <a href="#">
                Новости
              </a>
            </li>
            <li
              onClick={() => handleItemClick("about")}
              className={`${styles.navigation__item} ${
                activeItem === "about" ? "active__navbar" : ""
              }`}
            >
              <a href="#">
                О нас
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.block_3_mobile}>
          <div className={styles.personalOffice}>
            <img src={personal__office_svg} />
          </div>
          <div className={styles.cartMobile}>
            <img src={cart_svg} />
          </div>
        </div>
        <div className={styles.block_3}>
          <div className={styles.tools__navbar}>
            <div className={`${styles.favorite} ${activeItem === "favorite" ? "active__navbar" : ""}`} onClick={() => handleItemClick("favorite")}>
              <img src={favorite_svg} alt="Favorite svg" />
            </div>
            <div className={`${styles.cart} ${activeItem === "cart" ? "active__navbar" : ""}`} onClick={() => handleItemClick("cart")}>
              <img src={cart_svg} alt="Cart svg" />
            </div>
            <div className={`${styles.personal_office} ${activeItem === "auth" ? "active__navbar" : ""}`} onClick={() => handleItemClick("auth")}>
              <img src={personal__office_svg} alt="Personal svg" />
            </div>
          </div>
          <div className={`${styles.search__block} ${activeItem === "search__block" ? "active__navbar" : ""}`} onClick={() => handleItemClick("search__block")}>
            <input type="text" placeholder="Поиск..." name="search" />
            <img src={search_svg} alt="search_svg" className={styles.search__svg} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;