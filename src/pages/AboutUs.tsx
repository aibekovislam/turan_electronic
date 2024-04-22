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
            Дорогие друзья,<br/> С великой радостью и гордостью мы обращаемся к вам, нашим уважаемым пользователям, от лица нашего маркетплейса.<br/> Мы — команда, объединенная общей миссией сделать ваше онлайн-покупательское путешествие незабываемым, удобным и вдохновляющим. Наша цель — не просто предложить вам товары и услуги, а создать для вас пространство, где вы можете найти все, что вам нужно, и даже больше. Мы стремимся быть не просто местом для совершения покупок, но и центром ваших интересов, источником новых идей и вдохновения. Мы уверены в том, что каждый продукт и услуга на нашем маркетплейсе способны принести вам радость, удовлетворение и помочь вам воплотить в жизнь ваши мечты и амбиции. Мы всегда стремимся быть лучше, и поэтому мы постоянно работаем над улучшением нашей платформы, расширением ассортимента продукции, улучшением качества обслуживания и предоставлением вам новых возможностей.<br/> Вы, наши пользователи, — сердце и душа нашего маркетплейса. Мы ценим ваше доверие, поддержку и обратную связь. Вместе мы создаем уникальное сообщество, где каждый найдет что-то особенное для себя.Спасибо, что выбираете нас. Мы гордимся тем, что можем быть частью вашего путешествия. С любовью, Команда нашего маркетплейса
          </p>
        </div>
        <Brands/>
      </div>
    </>
  )
}

export default AboutUs