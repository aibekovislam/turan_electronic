import styles from "../styles/brands_and_footer.module.scss";
import { BrandsProps } from "../utils/interfacesAndTypes";
import FilterSVG from "../assets/svgs/Vector (18).svg";
import { useState } from "react";
import ArrowDown from "../assets/svgs/ArrowDown";
import { renderDropdownContent } from "../functions/renderDropdown.tsx";
import { useDispatch } from "react-redux";
import { fetchFilterProducts } from "../store/features/products/productSlice.ts";
import SidebarMenu from "./SidebarMenu.tsx";

function BrandFilterNavbar({ brand, products, colors }: BrandsProps) {
    const [pickedColor, setPickedColor] = useState<string | null>(null);
    const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));
    const [ isOpen, setIsOpen ] = useState(false);
    
    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleDropdownList = (index: number) => {
        const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
        setDropdownStates(newDropdownStates);
    };

    const dispatch = useDispatch<any>();

    const [filters, setFilters] = useState({
        limit: 10,
        offset: 0,
        min_price: undefined,
        max_price: undefined,
        brand: undefined,
        color: [] || "",
        memory: [],
        product_name: ""
      });

      const fetchProductsAndLog = (obj: any) => {
        const updatedFilters = { ...filters, ...obj };
        setFilters(updatedFilters);
        console.log(updatedFilters);
        dispatch(fetchFilterProducts(updatedFilters));
    };           

    return (
        <div className={styles.brands_navbar}>
            <div className={styles.brands_navbar__item}>
                <div className={styles.brands__info}>Главная / { brand.title }</div>
            </div>
            <div className={styles.brands_navbar__item}>
                <div className={styles.brands_navigation}>
                    {Array(5).fill(null).map((_, index) => (
                        <div key={index} className={styles.brands_navigation__item}>
                            <div className={styles.brands_info_block} onClick={() => handleDropdownList(index)}>
                                {index === 0 ? (
                                <img src={brand.logo_field} alt="brand" className={styles.brandLogo} />
                                ) : (
                                <div className={styles.brands__title_filter}>
                                    {index === 1 ? 'Модель' : index === 2 ? 'Объем' : index === 3 ? 'Цена' : index === 4 ? 'Цвет' : 'Все фильтры'}
                                </div>
                                )}
                            </div>
                            <div className={styles.brands__block_arrow_down} onClick={() => handleDropdownList(index)}>
                                <ArrowDown isUp={dropdownStates[index]} />
                            </div>
                            <div className={`${styles.dropdownContent} ${dropdownStates[index] ? styles.active : styles.notActive}`}>
                                { dropdownStates[index] && renderDropdownContent(index, products, colors, pickedColor, setPickedColor, brand, fetchProductsAndLog, filters) }
                            </div>
                        </div>
                    ))}
                    <div onClick={toggleSidebar} className={styles.brands_navigation__item} style={{ width: "13vw" }}>
                        Все фильтры
                        <img src={FilterSVG} className={styles.filter__svg} />
                    </div>
                    <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen} brand={brand} products={products} />
                </div>
            </div>
        </div>
    );
}

export default BrandFilterNavbar
