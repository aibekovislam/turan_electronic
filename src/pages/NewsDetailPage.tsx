import { useEffect, useState } from "react"
import styles from "../styles/news.module.scss"
import { fetchOneNews } from "../store/features/news/oneNewsSlice"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useParams } from "react-router-dom";
import { NewsType } from "../utils/interfacesAndTypes";

function NewsDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch<any>();
    const news = useSelector((state: RootStates) => state.oneNews.news);
    const [oneNews, setOneNews] = useState<NewsType[]>([])

    const numberedId = Number(id);

    useEffect(() => {
        dispatch(fetchOneNews(numberedId))
    }, [dispatch, id])

    
    



  return (
    <div className={styles.news_detail__main}>
        <div className={styles.news_detail__container}>
            <div className={styles.news_detail}>
                <div className={styles.news_detail__image}>
                    <img src={news?.image} />
                </div>
                <div className={styles.news_detai_section__title}>
                    <div className={styles.news_detail__title}>

                    </div>
                    <div className={styles.news_detail__text}>
                        
                    </div>
                </div>
                <div className={styles.news_detail__button}>
                    <button className={styles.news_detail_btn}>Оформить заявку</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewsDetailPage