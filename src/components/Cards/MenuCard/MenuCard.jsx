import image from '@assets/images/r.png'
import styles from './menu_card.module.scss'

const MenuCard = () => {
  return (
    <div className={styles.menu_card}>
      <img src={image} alt="Error :(" />
      <div className={styles.description}>
        <p className={styles.title}>Капучино</p>
        <p className={styles.price}>140 с</p>
      </div>
      <div className={styles.plus}>+</div>
    </div>
  )
}

export default MenuCard
