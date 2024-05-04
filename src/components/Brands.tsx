import styles from "../styles/brands_and_footer.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchBrands } from "../store/features/brands/brandsSlice";
import { BrandsType } from "../utils/interfacesAndTypes";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/consts";
import { useTranslation } from "react-i18next";

function Brands() {
    const dispatch = useDispatch<any>()
    const brands = useSelector((state: RootStates) => state.brands.brands)

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])

    const navigate = useNavigate();

    const handleNavigate = (brand: number | undefined) => {
        navigate(`/products/brands/${brand}`)
    }

    const { t } = useTranslation();

    return (
        <div className={styles.brands}>
            <div className={styles.brands__item}>
                <div className={styles.brands__title}>{ t("brands") }</div>
            </div>
            <div className={styles.brands__item}>
                {brands?.map((brand: BrandsType, index: number) => (
                    <div onClick={() => handleNavigate(brand?.id)} key={index} className={styles.brands__img}>
                        <img alt={brand.title} src={`${API_URL}/${brand.logo_field.slice(16)}`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Brands