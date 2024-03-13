import { fetchProducts } from "../store/features/products/productSlice";
import styles from "../styles/navbar_navigation.module.scss";
import { ProductsType } from "../utils/interfacesAndTypes";
import RangeSlider from "./RangeSlider";
import { extractBrandCategoryAndTitle, extractPropertyArray } from "./filterFunction";

export function renderDropdownSideBar(index: number, products: ProductsType[] | undefined, colors: string[] | undefined, pickedColor: any, setPickedColor: any, dispatch: any, brand: any, fetchProductsAndLog: any, filters: any, brands: any) {

    const isColorPicked = (color: string) => {
        return color === pickedColor;
    };
    
    const groupName = `group_${index}`;

    const brandCategoryArray = (propertyName: keyof ProductsType) => {
        return extractPropertyArray(products, propertyName);
    };

    const brandTitles = extractBrandCategoryAndTitle(products);
    const brandModels = brandCategoryArray('name');
    const productMemory = brandCategoryArray('memory');  
    

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
                    <RangeSlider fetchProductsAndLog={fetchProductsAndLog} brand={brand} products={products} />
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
                        <span className={styles.dropdown_text}>Все</span>
                    </div>
                    <div className={`${styles.d_f_colors}`}>
                        {colors?.map((item: any, index: number) => (
                            <div key={index} className={`${styles.dropdown__item}`}>
                                <div onClick={() => {handleColorClick(item)}} className={`${styles.color_block} ${isColorPicked(item) ? styles.color_picked : ''}`} style={{ background: item }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            )
        case 2: 
            return(
                <div className={styles.sidebar__items}> 
                    <div className={styles.sidebar_radio_1}>
                        <input
                            type="radio"
                            className={styles.dropdown_radio}
                            defaultChecked={true}
                        />
                        <span className={styles.dropdown_text}>Все</span>
                        {brands.map((item: any, innerIndex: number) => (
                        <div key={innerIndex} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                defaultChecked={true}    
                            />
                            <span className={styles.dropdown_text}>{item.title}</span>
                        </div>
                    ))}
                    </div>
                </div>
            )
        case 3: 
            return(
                <div className={styles.sidebar__items}>  
                    <div className={styles.sidebar_radio_2}>
                        <input
                            type="radio"
                            className={styles.dropdown_radio}
                            defaultChecked={true}
                        />
                        <span className={styles.dropdown_text}>Все</span>
                        {brandModels.map((item: any, index: number) => (
                        <div key={index} className={styles.dropdown__item}>
                            <input
                                type="radio"
                                className={styles.dropdown_radio}
                                name={groupName}
                                onChange={async () => {
                                    let obj = {
                                        limit: 10,
                                        offset: 0,
                                        min_price: undefined,
                                        max_price: undefined,
                                        brand: [],
                                        color: [],
                                        memory: [],
                                    }
                                    const res = await dispatch(fetchProducts(obj))
                                    console.log(res)
                                }}
                            />
                            <span className={styles.dropdown_text}>{item}</span>
                        </div>
                    ))}
                    </div>
                    <div className={styles.sidebar_all}>
                        <span>
                            Показать все 
                        </span>
                    </div>
                </div>
            )
        case 4: 
            return(
                <div className={styles.sidebar__items}>
                    <div className={styles.sidebar_radio}>
                    <input
                        type="radio"
                        className={styles.dropdown_radio}
                        defaultChecked={true}
                    />
                    <span className={styles.dropdown_text}>Все</span>
                    </div>
                    <div className={styles.sidebar_all}>
                    <span>
                        Показать все 
                    </span>
                    </div>
                </div>
            )
        default:
            return null;
    }
}