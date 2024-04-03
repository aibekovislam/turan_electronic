import { useDispatch } from "react-redux";
import styles from "../styles/navbar_navigation.module.scss";
import { ProductsType, RenderSidebarTypes } from "../utils/interfacesAndTypes";
import RangeSlider from "./RangeSlider";
import { compareByVolume, extractPropertyArray, filterMemory, returnColorsForFilter, sortData } from "./filterFunction";
import { setPickedOption, setPickedOptionSidebar } from "../store/features/dropdown/dropdownSlice";

export const RenderSidebarDrop = ({index, products, pickedColor, setPickedColor, brand, fetchProductsAndLog, filters, showAllColors, setShowAllColors, dataForDropDown, productsByBrandCategory}: RenderSidebarTypes) => {
    const dispatch = useDispatch();

    const colorsArray = products ? returnColorsForFilter(products.map(product => product.color)) : [];
    
    const groupName = `group_${index}`;

    const brandCategoryArray = (propertyName: keyof ProductsType) => {
        return extractPropertyArray(products, propertyName);
    };

    const brandModels = brandCategoryArray('name');
    const productMemory = dataForDropDown ? filterMemory(dataForDropDown?.map(product => product.memory)) : [];

    const handleColorClick = (color: string) => {
        setPickedColor(color === pickedColor ? null : color);
      
        console.log(pickedColor)
      
        let updatedColorArray;
        if (Array.isArray(filters.color)) {
            updatedColorArray = color === pickedColor ? filters.color.filter((c: string) => c !== color) : [...filters.color, color];
        } else {
            updatedColorArray = [color];
        }
      
        const updatedFilters = {
          ...filters,
          brand: brand.id,
          color: updatedColorArray,
        };
      
        fetchProductsAndLog(updatedFilters);
    };    
      
    switch (index) {
        case 0:
            return(
                <div className={styles.sidebar__items}>
                    <RangeSlider style={{ border: "none", boxShadow: "none" }} fetchProductsAndLog={fetchProductsAndLog} brand={brand} products={productsByBrandCategory} />
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
                    {colorsArray?.slice(0, showAllColors ? colorsArray.length : 12).map((item: any, index: number) => (
                        <div key={index} className={`${styles.dropdown__item}`} style={{ width: "max-content" }}>
                            <div onClick={() => {handleColorClick(item)}} className={`${styles.color_block} ${item === pickedColor ? styles.color_picked : ''}`} style={{ background: item.hash_code }}></div>
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
                                    limit: 100,
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
                                        dispatch(setPickedOption(item))
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
                        <div className={styles.d_f_radio}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                                id={`radio_${index}_all`}
                                defaultChecked={true}
                                onChange={() => {
                                    let obj = {
                                        limit: 100,
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
                        </div>
                        {productMemory.sort(compareByVolume).slice(0, showAllColors ? productMemory.length : 8).map((item: any, index: number) => (
                            <div key={index} className={styles.dropdown__item}>
                                <input
                                    type="radio"
                                    className={styles.dropdown_radio}
                                    name={groupName}
                                    id={`radio_${index}_all`}
                                    onChange={() => {
                                        dispatch(setPickedOptionSidebar(item.title))
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