import styles from "../styles/brands_and_footer.module.scss";
import logo from "../assets/svgs/logo.svg";
import facebook from "../assets/svgs/social_media/Footer → List → Link.svg";
import twitter from "../assets/svgs/social_media/Vector (10).svg";
import instagram from "../assets/svgs/social_media/Vector (11).svg";
import img1 from "../assets/svgs/footer/Vector (12).svg";
import img2 from "../assets/svgs/footer/Vector (13).svg";
import img3 from "../assets/svgs/footer/Vector (14).svg";
import img4 from "../assets/svgs/footer/Vector (15).svg";

function Footer() {
  return (
    <div className={styles.footer} style={{ marginBottom: "100px" }}>
        <div className={styles.footer__items}>
            <div className={styles.footer__item}>
                <div className={styles.footer__logo_and_info}>
                    <img src={logo} />
                    <div className={styles.info}>Turan Electronics - ваш идеальный магазин для шопинга. Обнаружьте последние тренды, выбирайте изысканные товары, оформляйте заказы с легкостью. Элегантный дизайн, безопасные платежи и быстрая доставка - все, что вам нужно для приятного онлайн-шопинга. <br/><br/><br/>Превратите свои желания в реальность с нами!</div>
                </div>
            </div>
            <div className={styles.footer__item}>
                <div className={styles.footer__social_media}>
                    <div className={styles.social_media__block}>
                        <img src={facebook} />
                    </div>
                    <div className={styles.social_media__block}>
                        <img src={twitter} />
                    </div>
                    <div className={styles.social_media__block}>
                        <img src={instagram} />
                    </div>
                </div>
            </div>
            <div className={styles.footer__item}>
                <div className={styles.footer__navigaiton}>
                    <div className={styles.footer__navigaiton__item}>
                        <div className={styles.footer__navigaiton__item_title}>Контакты</div>
                        <ul className={styles.footer__navigation__item_list}>
                            <li className={styles.list__item} style={{ marginTop: "20px" }}>
                                <img src={img1} />
                                <div className={styles.list__item_text}>Кыргызстан г. Бишкек ㅤㅤул.Киевская 168, 720001</div>
                            </li>
                            <li className={styles.list__item}>
                                <img src={img2} />
                                <div className={styles.list__item_text}>Работаем каждый день с 10:00 до 20:00</div>
                            </li>
                            <li className={styles.list__item}>
                                <img src={img3} />
                                <div className={styles.list__item_text}>Тел: +99600000000 Смартфоны</div>
                            </li>
                            <li className={styles.list__item}>
                                <img src={img4} />
                                <div className={styles.list__item_text}>Email: info@turanelectronic.kg</div>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.footer__navigaiton__item}>
                        <div className={styles.footer__navigaiton__item_title}>Информация</div>
                        <ul className={styles.footer__navigation__item_list}>
                            <li className={styles.list__item} style={{ marginTop: "20px" }}>Система начислений КЭШБЕК</li>
                            <li className={styles.list__item}>О Нас</li>
                            <li className={styles.list__item}>Условия гарантии</li>
                            <li className={styles.list__item}>Условия кредитования</li>
                            <li className={styles.list__item}>Доставка</li>
                            <li className={styles.list__item}>Политика конфиденциальности</li>
                            <li className={styles.list__item}>Публичная оферта</li>
                            <li className={styles.list__item}>Контакты</li>
                        </ul>
                    </div>
                    <div className={styles.footer__navigaiton__item}>
                        <div className={styles.footer__navigaiton__item_title}>Личный кабинет</div>
                        <ul className={styles.footer__navigation__item_list}>
                            <li className={styles.list__item} style={{ marginTop: "20px" }}>Личный Кабинет</li>
                            <li className={styles.list__item}>История заказов</li>
                            <li className={styles.list__item}>Закладки</li>
                            <li className={styles.list__item}>Сравнить</li>
                            <li className={styles.list__item}>Рассылка</li>
                            <li className={styles.list__item}>Карта сайта</li>
                            <li className={styles.list__item}>Производители</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer