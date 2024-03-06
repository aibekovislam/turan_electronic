import styles from "../styles/category.module.scss";
import Category from "./Category";
// import img1 from "../assets/category/image 21.png";
// import img2 from "../assets/category/image 5.png";
// import img3 from "../assets/category/image 7.png";
// import img4 from "../assets/category/image 10.png";
// import img5 from "../assets/category/image 8.png";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchBrands } from "../store/features/brands/brandsSlice";
import { BrandsType } from "../utils/interfacesAndTypes";

function CategoryList() {
  const dispatch = useDispatch<any>()
    const brands = useSelector((state: RootStates) => state.brands.brands)

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])

  return (
    <div className={styles.category__container}>
      <div className={styles.category_big}>
        <Category type={"big"} brand={brands[0]} />
      </div>
      <div className={styles.category_small}>
        {brands?.map((brand: BrandsType, index: number) => (
        <div className={styles.category_block} key={index}>
          <Category type={"small"} brand={brand}  />
        </div>
        ))}
         {/* <div className={styles.category_block}>
          <Category type={"small"} img__url={img4} brand={"Samsung"} />
          <Category type={"small"} img__url={img3} brand={"Xiaomi"} />
          <Category type={"small"} img__url={img5} brand={"Sony Playstation"} />
        </div>  */}
      </div>
    </div>
  )
}

export default CategoryList