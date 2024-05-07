import { useNavigate } from "react-router-dom";
import styles from "../styles/news.module.scss"

function NewsCard({item, index} : any) {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/news/${id}`)
  }

  return (
    <div key={index} className={styles.news_container}>
        <div className={styles.news_card}>
            <div className={styles.news}>
                <img onClick={() => handleNavigate(item.id)} src={`${item.image}`} className={styles.news_image} />
            </div>
        </div>
    </div>
  )
}

export default NewsCard