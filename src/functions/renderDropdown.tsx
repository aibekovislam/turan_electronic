import styles from "../styles/brands_and_footer.module.scss";

export function renderDropdownContent(index: number) {
    const groupName = `group_${index}`;

    switch (index) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
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