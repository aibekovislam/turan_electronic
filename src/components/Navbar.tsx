import styles from "../styles/navbar.module.scss";
import logo_svg from "../assets/svgs/Logo (1).svg";
import favorite_svg from "../assets/svgs/ic_outline-contact-support.svg";
import cart_svg from "../assets/svgs/Frame 53.svg";
import personal__office_svg from "../assets/svgs/Frame 52.svg";
import search_svg from "../assets/svgs/Button - Search → SVG.svg";
import border__img from "../assets/Frame 87.png";
import burger__menu from "../assets/svgs/Vector (16).svg";
import home_mobile from "../assets/svgs/navbarMobile/home.svg"
import heart_mobile from "../assets/svgs/navbarMobile/heart.svg"
import user_mobile from "../assets/svgs/navbarMobile/user.svg"
import Russia from '../assets/svgs/navbarMobile/russian.svg';
import English from '../assets/svgs/navbarMobile/english.svg';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProducts } from "../store/features/products/productSlice";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [activeItem, setActiveItem] = useState<string>(() => {
    return localStorage.getItem("activeItem") || "home";
  });
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const tokenString = localStorage.getItem("tokens");
  const token = tokenString ? JSON.parse(tokenString) : null;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
  const [ isMobileSearch, setIsMobileSearch ] = useState(false);
  const dispatch = useDispatch<any>();
  const [searchText, setSearchText] = useState<string>("");
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('Русский');
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const currentLanguage = i18n.language;

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!languageDropdown);
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setLanguageDropdown(false);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("selectedLanguage", selectedLanguage);
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("selectedLanguage");
    if (selectedLanguage) {
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);

    if (item === "home") {
      navigate("/");
    } else if (item === "profile" && (token === null || !user)) {
      navigate("/auth")
    } else {
      navigate(`/${item}`);
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    localStorage.setItem('searchText', searchText);
    dispatch(searchProducts(searchText));
  };

  return (
    <header className={styles.navbar}>
      <nav className={styles.navbar__items}>
        <div className={styles.block_1}>
          <img src={border__img} alt="border image" />
        </div>
        <div className={styles.block_1_mobile}>
          <div className={styles.burgerMenu}>
            <img src={burger__menu} alt="Бургер меню" title="Меню Turan electronics" />
          </div>
          <div className={`${styles.searchMobile} ${isMobileSearch ? styles.searchMobile__block : ""}`} onClick={() => {
            navigate("/search");
            setIsMobileSearch(true)
            }}>
            { isMobileSearch ? (
              <input type="text" value={searchText} placeholder={`${t("search")}...`} name="search" onChange={handleChangeSearch} onClick={() => {
                navigate("/search");
              }} />
              ) : (
              <img src={search_svg} alt="Поиск" title="Поиск" width={25} height={30} />
            ) }
          </div>
          { isMobileSearch ? (
            <span className={styles.close_search} onClick={() => setIsMobileSearch(false)}>{ t("close") }</span>
          ) : null }
        </div>
        <div className={styles.block_2}>
          <div className={styles.logo}>
              { !isMobileSearch ? (
                <img src={logo_svg} alt="Логотип Turan electronics" width={100} height={isMobile ? 30 : 100} title="Логотип Turan electronics интернет магазин для электроники в Бишкеке!" style={{ cursor: "pointer" }} onClick={() => handleItemClick("home")} />
              ) : (null) }
          </div>
          <ul className={styles.navigation}>
            <li
              onClick={() => handleItemClick("home")}
              className={`${styles.navigation__item} ${activeItem === "home" ? "active__navbar" : ""
                }`}
            >
              <a href="#">
                { t("home") }
              </a>
            </li>
            <li
              onClick={() => handleItemClick("categories")}
              className={`${styles.navigation__item} ${activeItem === "categories" ? "active__navbar" : ""
                }`}
            >
              <a href="#">
                { t("category") }
              </a>
            </li>
            <li
              onClick={() => handleItemClick("news")}
              className={`${styles.navigation__item} ${activeItem === "news" ? "active__navbar" : ""
                }`}
            >
              <a href="#">
                { t("news") }
              </a>
            </li>
            <li
              onClick={() => handleItemClick("about")}
              className={`${styles.navigation__item} ${activeItem === "about" ? "active__navbar" : ""
                }`}
            >
              <a href="#">
                { t("about") }
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.block_3_mobile}>
          <div className={styles.personalOffice}>
            <img src={personal__office_svg} alt="Личный кабинет" title="Личный кабинет Turan electronics" />
          </div>
          <div className={styles.cartMobile}>
            { !isMobileSearch ? (
              <img src={cart_svg} width={30} height={30} onClick={() => navigate("/cart")} alt="Корзина" title="Корзина Turan electronics" />
            ) : null }
          </div>
        </div>
        <div className={styles.block_3}>
          <div className={styles.tools__navbar}>
            <div className={`${styles.favorite} ${activeItem === "favorite" ? "active__navbar" : ""}`} onClick={() => handleItemClick("favorite")}>
              <img src={favorite_svg} alt="Избранное" title="Избранное Turan electronics" />
            </div>
            <div className={`${styles.cart} ${activeItem === "cart" ? "active__navbar" : ""}`} onClick={() => handleItemClick("cart")}>
              <img src={cart_svg} width={30} height={30} alt="Корзина" title="Корзина Turan electronics" />
            </div>
            <div className={`${styles.personal_office} ${activeItem === `${user ? "profile" : "auth"}` ? "active__navbar" : ""}`} onClick={() => handleItemClick("profile")}>
              <img src={personal__office_svg} alt="Личный кабинет" title="Личный кабинет Turan electronics" />
            </div>
          </div>
          <div
            className={`${styles.search__block} ${activeItem === "search__block" ? "active__navbar" : ""}`}
          // onClick={() => handleItemClick("search__block")}
          >
            <input type="text" placeholder={`${t("search")}...`} name="search" onChange={handleChangeSearch} onClick={() => {
                navigate("/search");
              }} />
            <img src={search_svg} className={styles.search__svg} alt="Поиск" title="Поиск Turan electronics" />
          </div>
          <div className={styles.lng}>
            <div className={styles.language_dropdown} onClick={toggleLanguageDropdown} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className={styles.selected_lng}>
                <span>{ languageDropdown ? t("choose_language") : i18n.language}</span>
                <img src={i18n.language === "Русский" ? Russia : English} alt="Выбрать язык" title="Выбрать язык Turan electronics" />
              </div>
              {languageDropdown && (
                <ul className={`${styles.language_list} animate__animated animate__fadeInDown`}>
                  <li onClick={() => handleLanguageChange('Русский')} style={{ textAlign: "center" }}>Русский<img src={Russia} alt="Русский язык" title="Русский язык Turan electronics" /></li>
                  <li onClick={() => handleLanguageChange('English')} style={{ textAlign: "center" }}>English<img src={English} alt="Английский язык" title="Английский язык Turan electronics" /></li>
                </ul>
              )}
            </div>
          </div>
        </div>
        { isMobile ? (
          <div className={styles.bottomNavbar}>
            <div className={styles.bottomNavItem}>
              <img onClick={() => navigate("/")} src={home_mobile} width={30} height={30} alt="Главная" title="Главная Turan electronics" style={{ width: "20px" }} />
            </div>
            <div className={styles.bottomNavItem}>
              <img onClick={() => navigate("/favorite")} src={heart_mobile} width={30} height={30} alt="Категории" title="Категории (каталог) Turan electronics" style={{ width: "20px" }} />
            </div>
            <div className={styles.bottomNavItem}>
              <img onClick={() => navigate("/cart")} src={cart_svg} width={30} height={30} alt="Корзина" title="Корзина Turan electronics" />
            </div>
            <div className={styles.bottomNavItem}>
              <img onClick={() => navigate(`/${user && token ? "profile" : "auth"}`)} src={user_mobile} width={30} height={30} alt="Профиль" title="Профиль Turan electronics" style={{ width: "20px" }} />
            </div>
            <div className={styles.lng_mobile}>
            <div className={styles.language_dropdown} onClick={() => {
              handleLanguageChange(currentLanguage === "Русский" ? "English" : "Русский")
            }} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className={styles.selected_lng}>
                <img width={40} height={25} src={i18n.language === "Русский" ? Russia : English} alt="Выбрать язык" title="Выбрать язык Turan electronics" />
              </div>
            </div>
          </div>
          </div>
        ) : (null) }
      </nav>
    </header>
  );
}

export default Navbar;