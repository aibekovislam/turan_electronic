import styles from "../styles/brands_and_footer.module.scss";
import logo from "../assets/svgs/Logo (1).svg";
import facebook from "../assets/svgs/social_media/Footer → List → Link.svg";
import twitter from "../assets/svgs/social_media/Vector (10).svg";
import instagram from "../assets/svgs/social_media/Vector (11).svg";
import img1 from "../assets/svgs/footer/Vector (12).svg";
import img2 from "../assets/svgs/footer/Vector (13).svg";
import img3 from "../assets/svgs/footer/Vector (14).svg";
import img4 from "../assets/svgs/footer/Vector (15).svg";
import { fetchFooters } from "../store/features/footer/footerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
    const dispatch = useDispatch<any>()
    const footers = useSelector((state: RootStates) => state.footers.footers)

    useEffect(() => {
        dispatch(fetchFooters())
    }, [dispatch])

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className={styles.footer} style={{ marginBottom: "100px" }}>
            <div className={styles.footer__items}>
                <div className={styles.footer__item}>
                    <div className={styles.footer__logo_and_info}>
                        <img src={logo} alt="Логотип Turan electronics" title="Логотип Turan electronics" />
                        <div className={styles.info}>{ t("footer_text1") }<br /><br /><br />{ t("footer_text2") }</div>
                    </div>
                </div>
                <div className={styles.footer__item}>
                    <div className={styles.footer__social_media}>
                        <div className={styles.social_media__block}>
                            <img src={facebook} alt="Facebook Turan electronics" title="Facebook Turan electronics" />
                        </div>
                        <div className={styles.social_media__block}>
                            <img src={twitter} alt="Twitter Turan electronics" title="Twitter Turan electronics" />
                        </div>
                        <div className={styles.social_media__block}>
                            <img src={instagram} alt="Instagram Turan electronics" title="Instagram Turan electronics" />
                        </div>
                    </div>
                </div>
                <div className={styles.footer__item}>
                    <div className={styles.footer__navigaiton}>
                        <div className={styles.footer__navigaiton__item}>
                            <div className={styles.footer__navigaiton__item_title}>{ t("contacts") }</div>
                            <ul className={styles.footer__navigation__item_list}>
                                <li className={styles.list__item} style={{ marginTop: "20px" }}>
                                    <img src={img1} alt="Место Turan electronics" title="Место Turan electronics" />
                                    <div className={styles.list__item_text}>{footers?.location}</div>
                                </li>
                                <li className={styles.list__item}>
                                    <img src={img2} alt="График работы Turan electronics" title="График работы Turan electronics" />
                                    <div className={styles.list__item_text}>{footers?.schedule}</div>
                                </li>
                                <li className={styles.list__item}>
                                    <img src={img3} alt="Контакты Turan electronics" title="Контакты Turan electronics" />
                                    <div className={styles.list__item_text}>{footers?.phone}</div>
                                </li>
                                <li className={styles.list__item}>
                                    <img src={img4} alt="Email Turan electronics" title="Email Turan electronics" />
                                    <div className={styles.list__item_text}>{footers?.email}</div>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.footer__navigaiton__item}>
                            <div className={styles.footer__navigaiton__item_title}>{ t("Info") }</div>
                            <ul className={styles.footer__navigation__item_list}>
                                <li className={styles.list__item} style={{ marginTop: "20px" }} onClick={() => navigate('/about')}>{ t("about") }</li>
                                <li className={styles.list__item} style={{ cursor: 'default' }}>{ t("contacts") }</li>
                            </ul>
                        </div>
                        <div className={styles.footer__navigaiton__item}>
                            <div className={styles.footer__navigaiton__item_title}>{ t("personal_cabinet") }</div>
                            <ul className={styles.footer__navigation__item_list}>
                                <li className={styles.list__item} style={{ marginTop: "20px" }} onClick={() => navigate("/auth")}>{ t("personal_cabinet") }</li>
                                <li className={styles.list__item} onClick={() => navigate("/categories")}>{ t("Production") }</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer