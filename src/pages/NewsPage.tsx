import styles from "../styles/news.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchNews } from "../store/features/news/newsSlice";
import { NewsType } from "../utils/interfacesAndTypes";
import NewsCard from "../components/NewsCard";

function NewsPage() {
  const dispatch = useDispatch<any>();
  const news = useSelector((state: RootStates) => state.news.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);


  return (
    <div className={styles.news_main}>
      {news?.map((item: NewsType, index: number) => (
        <NewsCard key={index} item={item}/>
      ))}
    </div>
  );
}

export default NewsPage;
