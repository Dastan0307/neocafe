import { SearchOutlined } from '@ant-design/icons'
import bell from '@assets/images/Bell.svg'
import pastry from '@assets/images/Frame 302 (1).svg'
import dessert from '@assets/images/Frame 302 (2).svg'
import drinks from '@assets/images/Frame 302 (3).svg'
import coffee from '@assets/images/Frame 302.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import OrderSider from '../../components/OrderSider/OrderSider'
import CoffeeList from './CoffeeList'
import DessertList from './DessertList'
import DrinksList from './DrinksList'
import MenuTabs from './MenuTabs'
import PastryList from './PastryList'
import styles from './menu.module.scss'

const Menu = () => {
  const dispatch = useDispatch()
  const [toggleSider, setToggleSider] = useState(false)

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

  const handleOpenSider = () => {
    setToggleSider(!toggleSider)
  }

  const handleOpenModal = () => {
    // dispatch(
    //   openModal({
    //     isOpen: true,
    //     modalType: 'addOption',
    //     modalProps: {},
    //   }),
    // )
    handleOpenSider()
  }

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
      <button className={styles.menu__takeout_btn} onClick={handleOpenModal}>
        Заказ на вынос <span>0 сом</span>
      </button>
      {toggleSider && (
        <OrderSider
          handleOpenSider={handleOpenSider}
          toggleSider={toggleSider}
        />
      )}
    </div>
  )
}

export default Menu
