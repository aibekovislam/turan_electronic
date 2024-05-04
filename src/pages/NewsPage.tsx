import styles from "../styles/news.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchNews } from "../store/features/news/newsSlice";
import { NewsType } from "../utils/interfacesAndTypes";
import NewsCard from "../components/NewsCard";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

function NewsPage() {
  const dispatch = useDispatch<any>();
  const news = useSelector((state: RootStates) => state.news.news);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  console.log(news)
  return (
    <>
      <Helmet>
        <title>Новости - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href={`https://turanelectronics.kg/news/`} />
      </Helmet>
      <div className={styles.news_main}>
        <div className={styles.path} style={{ marginTop: "30px" }}>
          <a href="/" onClick={() => {
                      localStorage.setItem("activeItem", JSON.stringify(`home`))
          }}>{ t("home") }</a> / <a href="/news">{ t("news") }</a>
        </div>
        {news?.map((item: NewsType, index: number) => (
          <NewsCard key={index} item={item}/>
        ))}
      </div>
    </>
  );
}

export default NewsPage;
