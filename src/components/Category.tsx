import { useNavigate } from "react-router-dom";
import styles from "../styles/category.module.scss";
import { CategoryProps } from "../utils/interfacesAndTypes";
import { useTranslation } from "react-i18next";

function Category({ type, brand }: CategoryProps) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const navigate = useNavigate();

  const handleNavigate = (id: number | undefined) => {
    navigate(`/products/brands/${id}`)
  }

  if (brand) {
    return (
      <div itemScope itemType="https://schema.org/Product" onClick={() => handleNavigate(brand?.id)} className={`${type === "big" ? styles.big_category : styles.category}`}>
        <div className={`${type === "big" ? styles.big_category_item : styles.category__item}`}>
          <img src={`${brand?.image}`} alt='brand_img' className={`${type === "big" ? styles.big_img : styles.brand__img}`} />
        </div>
        <div className={`${type === "big" ? styles.big_category_item_btn : styles.category__item_btn}`}>
          <div className={styles.brand__category} itemProp="brand">
            { currentLanguage === "Русский" ? brand?.title : brand?.title_en } 
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