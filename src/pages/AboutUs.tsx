import { Helmet } from "react-helmet-async";
import Brands from "../components/Brands";
import styles from "../styles/about.module.scss";

function AboutUs() {
  return (
    <>
      <Helmet>
        <title>О нас - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href="https://turanelectronics.kg/about" />
      </Helmet>
      <div className={styles.about_block}>
        <div className={styles.section_title}>
            <div>Главная / О нас</div>
        </div>
        <div className={styles.about_us}>
          <p>
            Доброго Времени Суток Дорогие Друзья!<br/>С огромной радостью, хотим рассказать, что Мы «Turan Electronics» запускаем свой Веб Сайт для Вашего удобства. Где Вы можете заказывать доставку со склада и наших магазинов Мультибрендовую Технику ведущих брендов по очень приятных ценам. И прямо через свой Компьютер, Ноутбук или Мобильный Телефон. Так скажем теперь ЦУМ у Вас на одном клике.<br/>Представляем Вам ассортимент самых популярных брендов техники в оригинальном качестве, от Ведущих Производителей напрямую из UAE, Hong-Kong, Japan, Korea. И что очень удобно доставка и консультация у Ваших дверей. <br/>Просим обратить внимание, что чем больше Вы будете заказывать в нашем сайте, тем больше мы будем завозить разных необычных и Хайповых Smart Move  товаров, а так же Новинки самых крутых и модных моделей. <br/>А так-же для корпоративных и оптовых клиентов доступны заказы B2B из UAE, Hong-Kong, Korea, Japan. <br/>С Большим Уважением: Turan Electronics Bishkek
          </p>
        </div>
        <Brands/>
      </div>
    </>
  )
}

export default AboutUs