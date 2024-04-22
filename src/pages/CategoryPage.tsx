import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import styles from "../styles/category.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { fetchBrands } from "../store/features/brands/brandsSlice";
import { BrandsType } from "../utils/interfacesAndTypes";
import Category from "../components/Category";
import { Helmet } from "react-helmet-async";

function CategoryPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const brands = useSelector((state: RootStates) => state.brands.brands);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Категории товаров - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href={`https://turanelectronics.kg/categories`} />
      </Helmet>
      <div>
        { isMobile ? (
          <div style={{ marginTop: "30px" }}>
            <div className={styles.category_small} style={{ width: "100%" }}>
              {brands.map((brand: BrandsType, index: number) => (
                <div key={index}>
                  <Category type={"small"} brand={brand} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <CategoryList/>
        ) }
      </div>
    </>
  )
}

export default CategoryPage