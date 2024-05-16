import styles from "../styles/slider.module.scss"
import { API_URL } from "../utils/consts";

export function ImageThumbnail({ image, index, handleClick, isSelected }: any) {
    return (
      <div className={styles.thumbnail}>
        <img
          
          className={isSelected ? styles.clicked : styles.detail_img__item}
          src={`${API_URL}${image}`}
          onClick={() => handleClick(index)}
          alt="Product Image"
          title="Product Image"
          fetchPriority="high"
          decoding="async"
          width={300}
          height={300}
        />
      </div>
    );
}