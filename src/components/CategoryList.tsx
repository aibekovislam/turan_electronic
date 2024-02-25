import styles from "../styles/category.module.scss";
import Category from "./Category";
import img1 from "../assets/category/image 21.png";
import img2 from "../assets/category/image 5.png";
import img3 from "../assets/category/image 7.png";
import img4 from "../assets/category/image 10.png";
import img5 from "../assets/category/image 8.png";

function CategoryList() {
  return (
    <div className={styles.category__container}>
      <div className={styles.category_big}>
        <Category type={"big"} img__url={img1} brand={"Dyson"} />
      </div>
      <div className={styles.category_small}>
        <Category type={"small"} img__url={img2} brand={"Apple"} />
        <Category type={"small"} img__url={img4} brand={"Samsung"} />
        <Category type={"small"} img__url={img3} brand={"Xiaomi"} />
        <Category type={"small"} img__url={img5} brand={"Sony Playstation"} />
      </div>
    </div>
  )
}

export default CategoryList