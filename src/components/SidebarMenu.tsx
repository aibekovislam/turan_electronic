import  { useEffect, useState } from 'react';
import styles from '../styles/navbar_navigation.module.scss';
import RangeSlider from '../functions/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterProducts, fetchProducts } from '../store/features/products/productSlice';
import { RootStates } from '../store/store';
import { default_filters } from '../utils/interfacesAndTypes';
import { useParams } from 'react-router-dom';
import { fetchOneBrand } from '../store/features/brands/oneBrandSlice';


function SidebarMenu({ isOpen, setIsOpen }: any) {
  const { brand } = useParams();
  const dispatch = useDispatch<any>();
  const oneBrand = useSelector((state: RootStates) => state.oneBrand.brand);
  const products = useSelector((state: RootStates) => state.products.products);
  // const colors = useSelector((state: RootStates) => state.products.colors);

  useEffect(() => {
    if(brand != undefined) {
        dispatch(fetchOneBrand(+brand))
    }
    dispatch(fetchProducts(default_filters));
}, [dispatch, brand]) 

  const toggleSidebar = () => setIsOpen(!isOpen);

  const [filters, setFilters] = useState({
      limit: 10,
      offset: 0,
      min_price: undefined,
      max_price: undefined,
      brand: undefined,
      product_color: [],
      memory: [],
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
          <div className={styles.sidebar__items}>
            <div className={styles.sidebar_title}>
              <span>Цена, Сом</span>
            </div>
            <RangeSlider fetchProductsAndLog={fetchProductsAndLog} brand={oneBrand} products={products} />
          </div>
          <div className={styles.sidebar__items}>
            <div className={styles.sidebar_title}>
              <span>Бренд</span>
            </div>
            <div className={styles.sidebar_radio}>
              <input
                type="radio"
                className={styles.dropdown_radio}
                defaultChecked={true}
              />
              <span className={styles.dropdown_text}>Все</span>
            </div>
          </div>
          <div className={styles.sidebar__items}>
            <div className={styles.sidebar_title}>
              <span>Цвет</span>
            </div>
          </div>
          <div className={styles.sidebar__items}>
            <div className={styles.sidebar_title}>
                <span>Модель</span>
            </div>
          </div>
          <div className={styles.sidebar__items}>
            <div className={styles.sidebar_title}>
              <span>Обьем</span>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}

export default SidebarMenu;
