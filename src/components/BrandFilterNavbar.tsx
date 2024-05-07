import styles from "../styles/brands_and_footer.module.scss";
import { BrandsProps } from "../utils/interfacesAndTypes";
import FilterSVG from "../assets/svgs/Vector (18).svg";
import { useEffect, useRef, useState } from "react";
import ArrowDown from "../assets/svgs/ArrowDown";
import { useDispatch } from "react-redux";
import { fetchFilterProducts, getProductsByBrandCategory } from "../store/features/products/productSlice.ts";
import SidebarMenu from "./SidebarMenu.tsx";
import { useNavigate } from "react-router-dom";
import { RenderDropdownContent } from "../functions/RenderDropdownContent.tsx";
import { useTranslation } from "react-i18next";

function BrandFilterNavbar({ brand, products, dataForDropDown, productsByBrandCategory }: BrandsProps) {
    const [pickedColor, setPickedColor] = useState<string | null>(null);
    const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
    const [filterUp, setFilterUp] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 520);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen === true) {
            fetchProductsAndLog({
                limit: 100,
                offset: 0,
                min_price: undefined,
                max_price: undefined,
                brand: undefined,
                color: [] || "",
                memory: [],
                product_name: ""
            })
        }
    }, [isOpen])

    const handleDropdownList = (index: number) => {
        const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
        setDropdownStates(newDropdownStates);
    };

    const dispatch = useDispatch<any>();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);

    const [filters, setFilters] = useState({
        limit: 100,
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

    const handleFilterUp = () => {
        setFilterUp(!filterUp)
    }

    const fetchFilterDropdown = (updated_filters: any) => {
        dispatch(getProductsByBrandCategory(updated_filters))
    }

    const handleMobileFilterClick = () => {
        handleFilterUp();
        toggleSidebar();
    }

    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
        isMobile ? (
            <div className={styles.brands_navbar} style={{ marginTop: "30px" }}>
                <div className={styles.brands_navbar__item} >
                    <div className={styles.brands__info}><span style={{ cursor: "pointer", userSelect: "none" }} onClick={() => navigate('/')}>{ t("home") }</span> / {brand.title}</div>
                </div>
                <div className={styles.brands_navbar__item} onClick={() => handleMobileFilterClick()} >
                    <div className={styles.brands_navigation} style={{ height: "40px", borderRadius: "10px", alignItems: "center", justifyContent: "space-between" }}>
                        <div className={styles.brands_navigation__item} style={{ height: "37px" }}>
                            <div className={styles.brands_info_block} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={`${brand.logo_field}`} style={{ width: "50px", height: "50px" }} alt="brand" className={styles.brandLogo} />
                            </div>
                        </div>
                        <div>{ t("filters") }</div>
                        <div className={styles.brands__block_arrow_down} style={{ display: "block", width: "18px", height: "18px", marginRight: "15px" }} onClick={handleFilterUp}>
                            <ArrowDown isUp={false} style={{ width: "18px", height: "18px", objectFit: "contain" }} />
                        </div>
                    </div>
                </div>
                <SidebarMenu isOpen={isOpen} brand={brand} products={products} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} dataForDropDown={dataForDropDown} productsByBrandCategory={productsByBrandCategory} />
            </div>
        ) : (
            <div className={styles.brands_navbar}>
                <div className={styles.brands_navbar__item}>
                    {/* <div className={styles.path}>
                        <a href="/">{ t("home") }</a> | {brand.title}
                    </div> */}
                </div>
                <div className={styles.brands_navbar__item}>
                    <div className={styles.brands_navigation}>
                        {Array(5).fill(null).map((_, index) => (
                            <div key={index} className={styles.brands_navigation__item}>
                                <div className={styles.brands_info_block} onClick={() => handleDropdownList(index)}>
                                    {index === 0 ? (
                                        <img itemProp="image" src={`${brand.logo_field}`} alt="brand" className={styles.brandLogo} />
                                    ) : (
                                        <div className={styles.brands__title_filter}>
                                            {index === 1 ? `${t("model")}` : index === 2 ? `${t("memory")}` : index === 3 ? `${t("price")}` : index === 4 ? `${t("color")}` : `${t("all_filters")}`}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.brands__block_arrow_down} onClick={() => handleDropdownList(index)}>
                                    <ArrowDown isUp={dropdownStates[index]} />
                                </div>
                                <div className={`${styles.dropdownContent} ${dropdownStates[index] ? styles.active : styles.notActive}`}>
                                    {dropdownStates[index] &&
                                        <RenderDropdownContent index={index} pickedColor={pickedColor} setPickedColor={setPickedColor} brand={brand} fetchProductsAndLog={fetchProductsAndLog} filters={filters} dataForDropdown={dataForDropDown} fetchFilterDropdown={fetchFilterDropdown} productsByBrandCategory={productsByBrandCategory} dropdownId={`dropdown_${brand.id}_index_${index}`} />
                                    }
                                </div>
                            </div>
                        ))}
                        <div onClick={toggleSidebar} className={styles.brands_navigation__item} >
                            <div>{ t("all_filters") }</div>
                            <img alt="filter svg" src={FilterSVG} className={styles.filter__svg} />
                        </div>
                        <SidebarMenu isOpen={isOpen} brand={brand} products={products} toggleSidebar={toggleSidebar} sidebarRef={sidebarRef} dataForDropDown={dataForDropDown} productsByBrandCategory={productsByBrandCategory} />
                    </div>
                </div>
            </div>
        )
    );
}

export default BrandFilterNavbar
