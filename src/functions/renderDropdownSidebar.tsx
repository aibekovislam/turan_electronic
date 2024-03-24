import styles from "../styles/navbar_navigation.module.scss";
import { ProductsType } from "../utils/interfacesAndTypes";
import RangeSlider from "./RangeSlider";
import { compareByVolume, extractPropertyArray, filterMemory, sortData } from "./filterFunction";

export function renderDropdownSideBar(index: number, products: ProductsType[] | undefined, colors: string[] | undefined, pickedColor: any, setPickedColor: any, brand: any, fetchProductsAndLog: any, filters: any, showAllColors: any, setShowAllColors: any) {

    const isColorPicked = (color: string) => {
        return color === pickedColor;
    };
    
    const groupName = `group_${index}`;

    const brandCategoryArray = (propertyName: keyof ProductsType) => {
        return extractPropertyArray(products, propertyName);
    };

    const brandModels = brandCategoryArray('name');
    const productMemory = products ? filterMemory(products.map(product => product.memory)) : [];

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
            return(
                <div className={styles.sidebar__items}>
                    <RangeSlider style={{ border: "none", boxShadow: "none" }} fetchProductsAndLog={fetchProductsAndLog} brand={brand} products={products} />
                </div>
            )
        case 1: 
            return(
            <div className={styles.sidebar__items}>
                <div className={styles.sidebar_radio}>
                    <div className={styles.sidebar_con}>
                        <input
                            type="radio"
                            className={styles.dropdown_radio}
                            id={`radio_${index}_all`}
                            name={groupName}
                            onChange={() => {
                                setPickedColor(null);
                                let obj = {
                                    limit: 10,
                                    offset: 0,
                                    min_price: undefined,
                                    max_price: undefined,
                                    brand: brand.id,
                                    color: [],
                                    memory: [],
                                }
                                fetchProductsAndLog(obj)
                            }}
                            checked={pickedColor === null}
                            />
                            <label htmlFor={`radio_${index}_all`} className={styles.dropdown_text}>Все</label>
                    </div>
                    <div className={`${styles.d_f_colors}`} style={{ justifyContent: "flex-start" }}>
                    {colors?.slice(0, showAllColors ? colors.length : 12).map((item: any, index: number) => (
                        <div key={index} className={`${styles.dropdown__item}`}>
                            <div onClick={() => {handleColorClick(item)}} className={`${styles.color_block} ${isColorPicked(item) ? styles.color_picked : ''}`} style={{ background: item }}></div>
                        </div>
                    ))}
                    </div>
                    <div className={styles.sidebar_all} onClick={() => setShowAllColors(!showAllColors)}>
                        <span>{ showAllColors ? "Вернуться" : "Показать все" }</span>
                    </div>
                </div>
            </div>
            )
        case 2: 
            return(
                <div className={styles.sidebar__items} style={{ marginTop: "10px" }}>  
                    <div className={styles.sidebar_radio_2}>
                        <input
                            type="radio"
                            className={styles.dropdown_radio}
                            id={`radio_${index}_all`}
                            name={groupName}
                            defaultChecked={true}
                            onChange={() => {
                                let obj = {
                                    limit: 10,
                                    offset: 0,
                                    min_price: undefined,
                                    max_price: undefined,
                                    brand: brand.id,
                                    color: [],
                                    memory: [],
                                    product_name: "",
                                }
                                fetchProductsAndLog(obj);
                            }}        
                        />
                        <label htmlFor={`radio_${index}_all`} className={styles.dropdown_text}>Все</label>
                        {sortData(brandModels).slice(0, showAllColors ? brandModels.length : 8).map((item: any, index: number) => (
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
                                            product_name: item
                                        };
                                        fetchProductsAndLog(updatedFilters);
                                        console.log(item)
                                    }}
                                />
                                <label htmlFor={`radio_${index}`} className={styles.dropdown_text}>{item}</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.sidebar_all} onClick={() => setShowAllColors(!showAllColors)}>
                        <span>{ showAllColors ? "Вернуться" : "Показать все" }</span>
                    </div>
                </div>
            )
        case 3: 
            return(
                <div className={styles.sidebar__items}>
                    <div className={styles.sidebar_radio}>
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
                                    color: [],
                                    memory: [],
                                    product_name: ""
                                }
                                fetchProductsAndLog(obj)
                            }}
                        />
                        <label htmlFor={`radio_${index}_all`} className={styles.dropdown_text}>Все</label>
                        {productMemory.sort(compareByVolume).slice(0, showAllColors ? productMemory.length : 8).map((item: any, index: number) => (
                            <div key={index} className={styles.dropdown__item}>
                                <input
                                    type="radio"
                                    className={styles.dropdown_radio}
                                    name={groupName}
                                    id={`radio_${index}_all`}
                                    onChange={() => {
                                        const updatedFilters = {
                                        ...filters,
                                        brand: brand.id,
                                        memory: item.volume
                                        };
                                        fetchProductsAndLog(updatedFilters);
                                    }}  
                                />
                                <label htmlFor={`radio_${index}_all`} className={styles.dropdown_text}>{item.volume} ГБ</label>
                            </div>
                        ))}
                    </div>
                    <div className={styles.sidebar_all} onClick={() => setShowAllColors(!showAllColors)}>
                        <span>{ showAllColors ? "Вернуться" : "Показать все" }</span>
                    </div>
                </div>
            )
        default:
            return null;
    }
}