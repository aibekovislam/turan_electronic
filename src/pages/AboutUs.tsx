import { Helmet } from "react-helmet-async";
import Brands from "../components/Brands";
import styles from "../styles/about.module.scss";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>О нас - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href="https://turanelectronics.kg/about" />
      </Helmet>
      <div className={styles.about_block}>
        <div className={styles.section_title}>
            <div>{ t("home") } / { t("about") }</div>
        </div>
        <div className={styles.about_us}>
          <p>
            { t("about_us_text") }
          </p>
        </div>
        <Brands/>
      </div>
    </>
  )
}

export default AboutUs