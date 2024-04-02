import { useEffect, useState } from 'react';
import styles from '../styles/navbar_navigation.module.scss';
import { useDispatch } from 'react-redux';
import { fetchFilterProducts } from '../store/features/products/productSlice';
import ArrowDown from '../assets/svgs/ArrowDown';
import { fetchBrands } from '../store/features/brands/brandsSlice';
import { RenderSidebarDrop } from '../functions/RenderSidebarDrop';

function SidebarMenu({ isOpen, brand, products, toggleSidebar, sidebarRef }: any) {
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [dropdownStates, setDropdownStates] = useState(Array(6).fill(false));
  const [showAllColors, setShowAllColors] = useState(false);
  const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchBrands())
    }, [dispatch])   

    const handleDropdownList = (index: number) => {
        const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
        setDropdownStates(newDropdownStates);
    };

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
        dispatch(fetchFilterProducts(updatedFilters));
        console.log(updatedFilters);
    };

  return (
    <>
      <div ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} id='sidebar' >
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
              <div className={styles.sidebar_title} onClick={() => handleDropdownList(index)}>
                  <span>
                    {index === 1 ? 'Цвет' : index === 2 ? 'Модель' : index === 3 ? 'Объем' : 'Цена'}
                  </span>
                  <div className={styles.brands__block_arrow_down}>
                    <ArrowDown isUp={dropdownStates[index]} />
                  </div>
              </div>
                  <div >
                      { dropdownStates[index] && <RenderSidebarDrop index={index} products={products} pickedColor={pickedColor} setPickedColor={setPickedColor} brand={brand} fetchProductsAndLog={fetchProductsAndLog} filters={filters} showAllColors={showAllColors} setShowAllColors={setShowAllColors} /> }
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
