import Card from './Card'
import styles from "../styles/listCard.module.scss";

function ListCard() {
  return (
    <div className={styles.list__container}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
    </div>
  )
}

export default ListCard