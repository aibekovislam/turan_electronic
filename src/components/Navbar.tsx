import styles from "../styles/navbar.module.scss";
import logo_svg from "../assets/svgs/logo.svg";
import favorite_svg from "../assets/svgs/ic_outline-contact-support.svg";
import cart_svg from "../assets/svgs/Frame 53.svg";
import personal__office_svg from "../assets/svgs/Frame 52.svg";
import search_svg from "../assets/svgs/Button - Search → SVG.svg";
import border__img from "../assets/Frame 87.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.block_1}>
        <img src={border__img} alt="img" />
      </div>
      <div className={styles.block_2}>
        <div className={styles.logo}>
          <img src={logo_svg} alt="logo" />
        </div>
        <ul className={styles.navigation}>
          <li className={styles.navigation__item}>
            <a href="#">Главная</a>
          </li>
          <li className={styles.navigation__item}>
            <a href="#">Категории</a>
          </li>
          <li className={styles.navigation__item}>
            <a href="#">Новости</a>
          </li>
          <li className={styles.navigation__item}>
            <a href="#">О нас</a>
          </li>
        </ul>
      </div>
      <div className={styles.block_3}>
        <div className={styles.tools__navbar}>
          <div className={styles.favorite}>
            <img src={favorite_svg} alt="Favorite svg" />
          </div>
          <div className={styles.cart}>
            <img src={cart_svg} alt="Cart svg" />
          </div>
          <div className={styles.personal_office}>
            <img src={personal__office_svg} alt="Personal svg" />
          </div>
        </div>
        <div className={styles.search__block}>
          <input type="text" placeholder="Поиск..." name="search" />
          <img src={search_svg} alt="search_svg" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
