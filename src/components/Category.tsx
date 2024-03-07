import styles from "../styles/category.module.scss";
import { CategoryProps } from "../utils/interfacesAndTypes";

function Category({ type, brand }: CategoryProps) {
  if (brand) {
    return (
      <div className={`${type === "big" ? styles.big_category : styles.category}`}>
        <div className={`${type === "big" ? styles.big_category_item : styles.category__item}`}>
          <img src={brand?.image} alt='brand_img' className={`${type === "big" ? styles.big_img : styles.brand__img}`} />
        </div>
        <div className={`${type === "big" ? styles.big_category_item_btn : styles.category__item_btn}`}>
          <div className={styles.brand__category}>
            { brand?.title } 
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default Category