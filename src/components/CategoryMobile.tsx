import styles from "../styles/categoryMobile.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBrands } from "../store/features/brands/brandsSlice";
import { RootStates } from "../store/store";
import { BrandsType } from "../utils/interfacesAndTypes";
import { useNavigate } from "react-router-dom";

function CategoryMobile() {
    const dispatch = useDispatch<any>();
    const brands = useSelector((state: RootStates) => state.brands.brands);
    const navigate = useNavigate();
    const [click, setClick] = useState<any>(false)

    const handleShowAllBrands = () => {
        setClick(true);
        navigate("/categories")
      };

    useEffect(() => {
      dispatch(fetchBrands());
    }, [dispatch]);


    const handleNavigate = (id: number | undefined) => {
      navigate(`/products/brands/${id}`)
    }

  return (
    <div className={styles.category_main}>
        <div className={styles.category_title}>
            <div>Бренды</div>
            <span onClick={() => handleShowAllBrands()}>Смотреть все</span>
        </div>
        <div className={styles.category_container}>
            {!click ? (
                brands.slice(0, 6).map((item: BrandsType, index: number) => (
                    <div onClick={() => handleNavigate(item?.id)} key={index} className={styles.category}>
                        <div className={styles.category_image}>
                            <img src={item?.image}  />
                        </div>
                        <span>{item.title}</span>
                    </div>
                ))
            ) : (
                brands.map((item: BrandsType, index: number) => (
                    <div onClick={() => handleNavigate(item?.id)} key={index} className={styles.category}>
                        <div className={styles.category_image}>
                            <img src={item?.image}  />
                        </div>
                        <span>{item.title}</span>
                    </div>
                ))
            )}
            
            
        </div>
    </div>
  )
}

export default CategoryMobile