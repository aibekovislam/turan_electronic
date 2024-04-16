import { useNavigate } from "react-router-dom";
import styles from "../styles/news.module.scss"
import { API_URL } from "../utils/consts";

function NewsCard({item, index} : any) {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/news/${id}`)
  }

  return (
    <div key={index} className={styles.news_container}>
        <div className={styles.news_card}>
            <div className={styles.news}>
                <img onClick={() => handleNavigate(item.id)} src={`${API_URL}/${item.image.slice(16)}`} className={styles.news_image} />
            </div>
        </div>
    </div>
  )
}

export default NewsCard