import MenuCard from '@components/Cards/MenuCard/MenuCard'
import styles from './menu.module.scss'

const DessertList = () => {
  return (
    <div className={styles.menu_container}>
      <MenuCard />
      <MenuCard />
      <MenuCard />
      <MenuCard />
    </div>
  )
}

export default DessertList
