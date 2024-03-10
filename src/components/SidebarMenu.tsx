import  { useState } from 'react';
import styles from '../styles/navbar_navigation.module.scss';
import RangeSlider from '../functions/RangeSlider';


function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className={styles.sidebarToggle} onClick={toggleSidebar}>
        Меню
      </button>
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={toggleSidebar}>
          X
        </button>
        <ul className={styles.sidebarLinks}>
          <div className={styles.sidebar__items}>
            <div className={styles.sidebar_title}>
              <span>Цена, Сом</span>
            </div>
            <RangeSlider/>
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
