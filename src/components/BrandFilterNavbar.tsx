import styles from "../styles/brands_and_footer.module.scss";
import { BrandsProps } from "../utils/interfacesAndTypes";
import FilterSVG from "../assets/svgs/Vector (18).svg";
import { useState } from "react";
import ArrowDown from "../assets/svgs/ArrowDown";
import { renderDropdownContent } from "../functions/renderDropdown";

function BrandFilterNavbar({ brandTitle, brandImg }: BrandsProps) {
    const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));

    const handleDropdownList = (index: number) => {
        const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
        setDropdownStates(newDropdownStates);
    };    

    return (
        <div className={styles.brands_navbar}>
            <div className={styles.brands_navbar__item}>
                <div className={styles.brands__info}>Главная / { brandTitle }</div>
            </div>
            <div className={styles.brands_navbar__item}>
                <div className={styles.brands_navigation}>
                    {Array(6).fill(null).map((_, index) => (
                        <div className={styles.brands_navigation__item} key={index} onClick={() => handleDropdownList(index)}>
                            <div className={styles.brands_info_block}>
                                {index === 0 ? (
                                <img src={brandImg} alt="brand" className={styles.brandLogo} />
                                ) : (
                                <div className={styles.brands__title_filter}>
                                    {index === 1 ? 'Модель' : index === 2 ? 'Объем' : index === 3 ? 'Цена, сом' : index === 4 ? 'Цвет' : 'Все фильтры'}
                                </div>
                                )}
                            </div>
                            <div className={styles.brands__block_arrow_down}>
                                <ArrowDown isUp={dropdownStates[index]} />
                            </div>
                            <div className={`${styles.dropdownContent} ${dropdownStates[index] ? styles.active : styles.notActive}`}>
                                {dropdownStates[index] && renderDropdownContent(index)}
                            </div>
                        </div>
                    ))}
                    <div className={styles.brands_navigation__item} style={{ width: "6vw" }}>
                        <img src={FilterSVG} className={styles.filter__svg} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrandFilterNavbar