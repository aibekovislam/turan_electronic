import { useEffect } from "react"
import styles from "../styles/news.module.scss"
import { fetchOneNews } from "../store/features/news/oneNewsSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useParams } from "react-router-dom";

function NewsDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const news = useSelector((state: RootStates) => state.oneNews.news);

    const numberedId = Number(id);

    useEffect(() => {
        dispatch(fetchOneNews(numberedId))
    }, [dispatch, id])

  return (
    <div className={styles.news_detail__main}>
        <div className={styles.news_detail__container}>
            <div className={styles.path}>
                <a href="/" onClick={() => {
                    localStorage.setItem("activeItem", JSON.stringify(`home`))
                }}>Главная</a> / <a href="/news">Новости</a> / { news?.title }
            </div>
            <div className={styles.news_detail}>
                <div className={styles.news_detail__image}>
                    <img src={news?.image} />
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
  )
}

export default NewsDetailPage