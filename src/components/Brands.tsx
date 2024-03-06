import styles from "../styles/brands_and_footer.module.scss";
// import apple from "../assets/svgs/brands/image 33.svg";
// import dyson from "../assets/svgs/brands/image 34.svg";
// import playstation from "../assets/svgs/brands/image 35.svg";
// import samsung from "../assets/svgs/brands/image 36.svg";
// import xiaomi from "../assets/svgs/brands/image 37.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchBrands } from "../store/features/brands/brandsSlice";
import { BrandsType } from "../utils/interfacesAndTypes";

function Brands() {
    const dispatch = useDispatch<any>()
    const brands = useSelector((state: RootStates) => state.brands.brands)

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])

    console.log(brands, "Brands");
    

  return (
    <div className={styles.brands}>
        <div className={styles.brands__item}>
            <div className={styles.brands__title}>Бренды</div>
        </div>
        <div className={styles.brands__item}>
            {brands?.map((brand: BrandsType, index : number) => (
                <div key={index}  className={styles.brands__img}>
                    <img  src={brand.logo_field} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Brands