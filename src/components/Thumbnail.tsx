import styles from "../styles/slider.module.scss"
import { API_URL } from "../utils/consts";

export function ImageThumbnail({ image, index, handleClick, isSelected, product }: any) {
    return (
      <div className={styles.thumbnail}>
        <img
          loading="lazy"
          height={300}
          width={300}
          className={isSelected ? styles.clicked : styles.detail_img__item}
          src={`${API_URL}${image}`}
          onClick={() => handleClick(index)}
          alt={`Купить ${product.brand_title} ${product.name} в Бишкеке`}
          title={`Купить ${product.brand_title} ${product.name} в Бишкеке`}
          fetchPriority="high"
        />
      </div>
    );
}