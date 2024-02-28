import styles from "../styles/favoriteEmpty.module.scss"

function FavoriteEmpty() {
  return (
    <div className={styles.favoriteEmpty_main}>
        <div className={"accessories"}>
            <div className="accessories__item">
                Избранное
            </div>
        </div>
        <div className={styles.favoriteEmpty_container}>
            <div className={styles.favoriteEmpty}>
                <div className={styles.section_title}>
                    <div>Пусто</div>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default FavoriteEmpty