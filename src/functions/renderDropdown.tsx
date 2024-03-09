import styles from "../styles/brands_and_footer.module.scss";

export function renderDropdownContent(index: number) {
    const groupName = `group_${index}`;


    switch (index) {
        case 0:
            return (
                <div className={styles.dropdown__list}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className={styles.dropdown__item}>
                            <input type="radio" className={styles.dropdown_radio} name={groupName} />
                            <span className={styles.dropdown_text}>Все</span>
                        </div>
                    ))}
                </div>
            );
        case 1:
            return (
                <div className={styles.dropdown__list}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className={styles.dropdown__item}>
                            <input type="radio" className={styles.dropdown_radio} name={groupName} />
                            <span className={styles.dropdown_text}>Все</span>
                        </div>
                    ))}
                </div>
            );
        case 2:
            return (
                <div className={styles.dropdown__list}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className={styles.dropdown__item}>
                            <input type="radio" className={styles.dropdown_radio} name={groupName} />
                            <span className={styles.dropdown_text}>Все</span>
                        </div>
                    ))}
                </div>
            );
        case 3:
            return (
                <div className={styles.wrapper}>
                    <header className={styles.header}>
                        <h2>Price Range</h2>
                        <p>use slider or enter min and max price</p>
                    </header>
                    <div className={styles.price_input}>
                        <div className={styles.field}>
                            <span>Min</span>
                            <input type="number" className={styles.input_min} value={2500}  />
                        </div>
                        <div className={styles.separator}>-</div>
                        <div className={styles.field}>
                            <span>Min</span>
                            <input type="number" className={styles.input_min} value={7500}  />
                        </div>
                    </div>
                    <div className={styles.slider}>
                        <div className={styles.progress}></div>
                    </div>
                    <div className={styles.range_input}>
                        <input type="range" className={styles.range_min} min={0} max={10000} value={2500} step={100} />
                        <input type="range" className={styles.range_max} min={0} max={10000} value={7500} step={100} />
                    </div>
                </div>
            )
        case 4:
            return (
                <div className={styles.dropdown__list}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className={styles.dropdown__item}>
                            <input type="radio" className={styles.dropdown_radio} name={groupName} />
                            <span className={styles.dropdown_text}>Все</span>
                        </div>
                    ))}
                </div>
            );
        case 5:
            return (
                <div className={styles.dropdown__list}>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <div key={item} className={styles.dropdown__item}>
                            <input type="radio" className={styles.dropdown_radio} name={groupName} />
                            <span className={styles.dropdown_text}>Все</span>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
}