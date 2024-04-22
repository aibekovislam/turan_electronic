import { useEffect } from "react"
import styles from "../styles/news.module.scss"
import { fetchOneNews } from "../store/features/news/oneNewsSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { Helmet } from "react-helmet-async";

function NewsDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const news = useSelector((state: RootStates) => state.oneNews.news);

    const numberedId = Number(id);

    useEffect(() => {
        dispatch(fetchOneNews(numberedId))
    }, [dispatch, id])

  return (
    <>
        <Helmet>
            <title>Новости {`${news?.title}`} - Turan electronics</title>
            <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
            <link rel="canonical" href={`https://turanelectronics.kg/news/${news.id}`} />
        </Helmet>
        <div className={styles.news_detail__main}>
            <div className={styles.news_detail__container}>
                <div className={styles.path}>
                    <a href="/" onClick={() => {
                        localStorage.setItem("activeItem", JSON.stringify(`home`))
                    }}>Главная</a> / <a href="/news">Новости</a> / { news?.title }
                </div>
                <div className={styles.news_detail}>
                    <div className={styles.news_detail__image}>
                        <img src={`${API_URL}/${news?.image.slice(16)}`} />
                    </div>
                    <div className={styles.news_detai_section__title}>
                        <div className={styles.news_detail__title}>
                            { news?.title }
                        </div>
                        <div className={styles.news_detail__text}>
                            { news?.text }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default NewsDetailPage