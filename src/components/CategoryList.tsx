import { useState, useEffect } from 'react';
import styles from "../styles/category.module.scss";
import Category from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { fetchBrands } from "../store/features/brands/brandsSlice";
import { BrandsType } from "../utils/interfacesAndTypes";
import CategoryMobile from "./CategoryMobile";

function CategoryList() {
  const dispatch = useDispatch<any>();
  const brands = useSelector((state: RootStates) => state.brands.brands);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
  
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <CategoryMobile />
      ) : (
        <>
          <div className={styles.category__container}>
            <div className={styles.category_big}>
              {brands.length > 0 && <Category type={"big"} brand={brands[0]} />}
            </div>
            <div className={styles.category_small}>
              {brands.slice(1, 5).map((brand: BrandsType, index: number) => (
                <div key={index}>
                  <Category type={"small"} brand={brand} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.category__container} style={{ marginTop: "15px" }}>
            {/* <div className={styles.category_small}> */}
              {brands.slice(5).map((brand: BrandsType, index: number) => (
                <div key={index}>
                  <Category type={"small"} brand={brand} />
                </div>
              ))}
            </div>
          {/* </div> */}
        </>
      )}
    </>
  );
}

export default CategoryList;