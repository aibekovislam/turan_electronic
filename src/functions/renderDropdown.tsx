import styles from "../styles/brands_and_footer.module.scss";
import { ProductsType } from "../utils/interfacesAndTypes";
import RangeSlider from "./RangeSlider";
import { extractPropertyArray } from "./filterFunction";

export function renderDropdownContent(index: number, products: ProductsType[] | undefined, colors: string[] | undefined, pickedColor: any, setPickedColor: any) {

    const handleColorClick = (color: string) => {
        setPickedColor(color === pickedColor ? null : color);
    };
    
    const isColorPicked = (color: string) => {
        return color === pickedColor;
    };
    
    const groupName = `group_${index}`;

    const brandCategoryArray = (propertyName: keyof ProductsType) => {
        return extractPropertyArray(products, propertyName);
    };

    const brandTitles = brandCategoryArray('brand_category_title');
    const brandModels = brandCategoryArray('name');
    const productMemory = brandCategoryArray('memory');  

    switch (index) {
        case 0:
            return (
                <div className={styles.dropdown__list}>
                    <input
                        type="radio"
                        className={styles.dropdown_radio}
                        name={groupName}
                        defaultChecked={true}
                        />
                    <span className={styles.dropdown_text}>Все</span>
                    {brandTitles.map((item: any, index: number) => (
                        <div key={index} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                            />
                            <span className={styles.dropdown_text}>{item}</span>
                        </div>
                    ))}
                </div>
            );
        case 1:
            return (
                <div className={styles.dropdown__list}>
                    <input
                        type="radio"
                        className={styles.dropdown_radio}
                        name={groupName}
                        defaultChecked={true}
                        />
                    <span className={styles.dropdown_text}>Все</span>
                    {brandModels.map((item: any, index: number) => (
                        <div key={index} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                            />
                            <span className={styles.dropdown_text}>{item}</span>
                        </div>
                    ))}
                </div>
            );
        case 2:
            return (
                <div className={styles.dropdown__list}>
                    <input
                        type="radio"
                        className={styles.dropdown_radio}
                        name={groupName}
                        defaultChecked={true}
                        />
                    <span className={styles.dropdown_text}>Все</span>
                    {productMemory.map((item: any, index: number) => (
                        <div key={index} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                            />
                            <span className={styles.dropdown_text}>{item} ГБ</span>
                        </div>
                    ))}
                </div>
            );
        case 3:
            return <RangeSlider />;
        case 4:
            return (
                <div className={`${styles.dropdown__list}`}>
                    <input
                        type="radio"
                        className={styles.dropdown_radio}
                        name={groupName}
                        onChange={() => setPickedColor(null)}
                        checked={pickedColor === null}
                        />
                    <span className={styles.dropdown_text}>Все</span>
                    <div className={`${styles.d_f_colors}`}>
                        {colors?.map((item: any, index: number) => (
                            <div key={index} className={`${styles.dropdown__item}`}>
                                <div onClick={() => handleColorClick(item)} className={`${styles.color_block} ${isColorPicked(item) ? styles.color_picked : ''}`} style={{ background: item }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 5:
            return (
                <div className={styles.dropdown__list}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                                defaultChecked={false}
                            />
                            <span className={styles.dropdown_text}>Все</span>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
}