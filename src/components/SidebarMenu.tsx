import { useEffect, useState } from 'react';
import styles from '../styles/navbar_navigation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterProducts } from '../store/features/products/productSlice';
import ArrowDown from '../assets/svgs/ArrowDown';
import { renderDropdownSideBar } from '../functions/renderDropdownSidebar';
import { RootStates } from '../store/store';
import { fetchBrands } from '../store/features/brands/brandsSlice';


function SidebarMenu({ isOpen, setIsOpen, brand, products }: any) {
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));
  const colors = useSelector((state: RootStates) => state.products.colors);
  const brands = useSelector((state: RootStates) => state.brands.brands)
  const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleDropdownList = (index: number) => {
        const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
        setDropdownStates(newDropdownStates);
    };


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
        dispatch(fetchFilterProducts(updatedFilters));
        console.log(updatedFilters);
    };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.d_f_filters}>
          <span className={styles.main_title_filters}>Фильтры</span>
          <button className={styles.closeBtn} onClick={toggleSidebar}>
            X
          </button>
        </div>
        <ul className={styles.sidebarLinks}>

          <div className={styles.sidebar_main}>
          {Array(4).fill(null).map((_, index) => (
            <div key={index} className={styles.sidebar__items}>
              <div className={styles.sidebar_title}>
                  <span>
                    {index === 1 ? 'Цвет' : index === 2 ? 'Модель' : index === 3 ? 'Обьем' : 'Цена Сом'}
                  </span>
                  <div className={styles.brands__block_arrow_down} onClick={() => handleDropdownList(index)}>
                    <ArrowDown isUp={dropdownStates[index]} />
                  </div>
              </div>
                  <div >
                      { dropdownStates[index] && renderDropdownSideBar(index, products, colors, pickedColor, setPickedColor, dispatch, brand, fetchProductsAndLog, filters, brands) }
                  </div>
            </div>
          ))}
          </div>
        </ul>
      </div>
    </>
  );
}

export default SidebarMenu;
