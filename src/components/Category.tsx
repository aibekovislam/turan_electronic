import styles from "../styles/category.module.scss";
import { CategoryProps } from "../utils/interfacesAndTypes";

function Category({ type, img__url, brand }: CategoryProps) {
  return (
    <div className={`${type === "big" ? styles.big_category : styles.category}`}>
      <div className={`${type === "big" ? styles.big_category_item : styles.category__item}`}>
        <img src={img__url} alt='brand_img' className={`${type === "big" ? styles.big_img : styles.brand__img}`} />
      </div>
      <div className={`${type === "big" ? styles.big_category_item_btn : styles.category__item_btn}`}>
        <div className={styles.brand__category}>{ brand }</div>
      </div>
    </div>
  )
}

export default Category