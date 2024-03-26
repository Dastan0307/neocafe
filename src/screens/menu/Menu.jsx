import { SearchOutlined } from '@ant-design/icons'
import bell from '@assets/images/Bell.svg'
import pastry from '@assets/images/Frame 302 (1).svg'
import dessert from '@assets/images/Frame 302 (2).svg'
import drinks from '@assets/images/Frame 302 (3).svg'
import coffee from '@assets/images/Frame 302.svg'
import CoffeeList from './CoffeeList'
import DessertList from './DessertList'
import DrinksList from './DrinksList'
import MenuTabs from './MenuTabs'
import PastryList from './PastryList'
import styles from './menu.module.scss'

const Menu = () => {
  const tabs = [
    {
      label: (
        <p className={styles.list__item_first}>
          <img src={coffee} alt="coffee" />
          Кофе
        </p>
      ),
      content: <CoffeeList />,
    },
    {
      label: (
        <p className={styles.list__item}>
          <img src={pastry} alt="pastry" />
          Выпечка
        </p>
      ),
      content: <PastryList />,
    },
    {
      label: (
        <p className={styles.list__item}>
          <img src={dessert} alt="dessert" />
          Десерты
        </p>
      ),
      content: <DessertList />,
    },
    {
      label: (
        <p className={styles.list__item}>
          <img src={drinks} alt="drinks" />
          Напитки
        </p>
      ),
      content: <DrinksList />,
    },
  ]

  return (
    <div className={styles.menu}>
      <header className={styles.menu__header}>
        <h3>Меню</h3>
        <div className={styles.input}>
          <SearchOutlined className={styles.input_icon} />
          <input type="text" placeholder="Поиск" />
        </div>
        <img src={bell} alt="Error :(" width={48} />
      </header>
      <MenuTabs tabs={tabs} />
      <button className={styles.menu__takeout_btn}>
        Заказ на вынос <span>0 сом</span>
      </button>
    </div>
  )
}

export default Menu
