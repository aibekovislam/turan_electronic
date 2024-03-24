import styles from "../styles/brands_and_footer.module.scss";
import { ProductsType } from "../utils/interfacesAndTypes";
import RangeSlider from "./RangeSlider";
import { compareByVolume, extractBrandCategoryAndTitle, extractPropertyArray, filterMemory, returnColorsForFilter, sortData } from "./filterFunction";

export function renderDropdownContent(index: number, products: ProductsType[] | undefined, pickedColor: any, setPickedColor: any, brand: any, fetchProductsAndLog: any, filters: any) {

    const isColorPicked = (color: string) => {
        return color === pickedColor;
    };
    
    const groupName = `group_${index}`;

    const brandCategoryArray = (propertyName: keyof ProductsType) => {
        return extractPropertyArray(products, propertyName);
    };

    const brandTitles = extractBrandCategoryAndTitle(products);
    const brandModels = brandCategoryArray('name');
    const productMemory = products ? filterMemory(products.map(product => product.memory)) : [];
    const colorsArray = products ? returnColorsForFilter(products.map(product => product.color)) : [];

    const handleColorClick = (color: string) => {
        setPickedColor(color === pickedColor ? null : color);
      
        const updatedFilters = {
          ...filters,
          brand: brand.id,
          color: color === pickedColor ? [] : color,
        };
      
        fetchProductsAndLog(updatedFilters);
    };

    switch (index) {
        case 0:
            return (
                <div className={styles.dropdown__list}>
                    <label className={styles.dropdown_label}>
                        <input
                            type="radio"
                            className={styles.dropdown_radio}
                            name={groupName}
                            defaultChecked={true}
                            onChange={() => {
                                let obj = {
                                    limit: 10,
                                    offset: 0,
                                    min_price: undefined,
                                    max_price: undefined,
                                    brand: brand.id,
                                    brand_category: undefined,
                                    color: [],
                                    memory: [],
                                    product_name: ""
                                }
                                fetchProductsAndLog(obj);
                            }}
                            />
                        <span className={styles.dropdown_text}>Все</span>
                    </label>
                    {sortData(brandTitles).map((item: any, innerIndex: number) => (
                        <div key={innerIndex} className={styles.dropdown__item}>
                            <label className={styles.dropdown_label}>
                                <input
                                    type="radio"
                                    className={styles.dropdown_radio}
                                    name={groupName}
                                    onChange={() => {
                                        const updatedFilters = {
                                            ...filters,
                                            brand: brand.id,
                                            brand_category: item.id
                                        };
                                        fetchProductsAndLog(updatedFilters);
                                    }}
                                />
                                <span
                                    className={styles.dropdown_text}>
                                    {item.title}
                                </span>
                            </label>
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
                        id={`radio_${index}_all`}
                        defaultChecked={true}
                        onChange={() => {
                            let obj = {
                                limit: 10,
                                offset: 0,
                                min_price: undefined,
                                max_price: undefined,
                                brand: brand.id,
                                brand_category: undefined,
                                color: [],
                                memory: [],
                                product_name: ""
                            }
                            fetchProductsAndLog(obj);
                        }}
                        />
                    <label htmlFor={`radio_${index}_all`} className={styles.dropdown_text}>Все</label>
                    {sortData(brandModels).map((item: any, index: number) => (
                        <div key={index} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                id={`radio_${index}`}
                                className={styles.dropdown_radio}
                                name={groupName}
                                onChange={async () => {
                                    const updatedFilters = {
                                        ...filters,
                                        brand: brand.id,
                                        product_name: item
                                    };
                                    fetchProductsAndLog(updatedFilters);
                                }}
                            />
                            <label htmlFor={`radio_${index}`} className={styles.dropdown_text}>{ item }</label>
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
                        id={`radio_${index}_all`}
                        defaultChecked={true}
                        onChange={() => {
                            let obj = {
                                limit: 10,
                                offset: 0,
                                min_price: undefined,
                                max_price: undefined,
                                brand: brand.id,
                                brand_category: undefined,
                                color: [],
                                memory: [],
                                product_name: ""
                            }
                            fetchProductsAndLog(obj)
                        }}
                    />
                    <label htmlFor={`radio_${index}_all`} className={styles.dropdown_text}>Все</label>
                    {productMemory
                        .sort(compareByVolume)
                        .map((item: any, index: number) => (
                            <div key={index} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                                id={`radio_${index}`}
                                onChange={() => {
                                const updatedFilters = {
                                    ...filters,
                                    brand: brand.id,
                                    memory: item.volume
                                };
                                fetchProductsAndLog(updatedFilters);
                                }}  
                            />
                            <label htmlFor={`radio_${index}`} className={styles.dropdown_text}>
                                {item.volume} ГБ
                            </label>
                            </div>
                        ))}
                </div>
            );
        case 3:
            return <RangeSlider fetchProductsAndLog={fetchProductsAndLog} brand={brand} products={products} />;
        case 4:
            return (
                <div className={`${styles.dropdown__list}`}>
                    <input
                        type="radio"
                        className={styles.dropdown_radio}
                        name={groupName}
                        id={`radio_${index}`}
                        onChange={() => {
                            setPickedColor(null);
                            let obj = {
                                limit: 10,
                                offset: 0,
                                min_price: undefined,
                                max_price: undefined,
                                brand: brand.id,
                                brand_category: undefined,
                                color: [],
                                memory: [],
                                product_name: ""
                            }
                            fetchProductsAndLog(obj)
                        }}
                        checked={pickedColor === null}
                        />
                    <label htmlFor={`radio_${index}`} className={styles.dropdown_text}>Все</label>
                    <div className={`${styles.d_f_colors}`}>
                        {colorsArray?.map((item: any, index: number) => (
                            <div key={index} className={`${styles.dropdown__item}`}>
                                <div onClick={() => {handleColorClick(item.hash_code)}} className={`${styles.color_block} ${isColorPicked(item.hash_code) ? styles.color_picked : ''}`} style={{ background: item.hash_code }}></div>
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
            return;   
    }
}