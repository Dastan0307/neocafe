import { SearchOutlined } from '@ant-design/icons'
import {
  bell,
  coffee,
  coffeeActive,
  custom_svg,
  custom_svg_active,
  dessert,
  dessertActive,
  drinks,
  drinksActive,
  pastry,
  pastryActive,
} from '@assets/index.js'
import { getBranchesMenu } from '@store/slices/menuSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import OrderSider from '../../components/OrderSider/OrderSider'
import CoffeeList from './CoffeeList'
import DessertList from './DessertList'
import DrinksList from './DrinksList'
import MenuTabs from './MenuTabs'
import PastryList from './PastryList'
import styles from './menu.module.scss'
import CustomContainer from './CustomContainer'

const category = [
  {
    id: 1,
    name: 'Выпечка',
    image: null,
  },
  {
    id: 2,
    name: 'Кофе',
    image: null,
  },
  {
    id: 3,
    name: 'Чай',
    image: null,
  },
  {
    id: 4,
    name: 'Десерт',
    image: null,
  },
  {
    id: 5,
    name: 'Салат',
    image: null,
  },
  {
    id: 6,
    name: 'Овощи',
    image: null,
  },
]
const Menu = () => {
  const dispatch = useDispatch()
  // const { category } = useSelector(state => state.menu)
  const [toggleSider, setToggleSider] = useState(false)
  const [isAcitve, setIsActive] = useState(0)
  const [search, setSearch] = useState('')
  const [getNameCategory, setGetNameCategory] = useState('')

  const filter_category = category.filter(
    (category) =>
      (category.name !== 'Кофе') &
      (category.name !== 'Десерт') &
      (category.name !== 'Выпечка') &
      (category.name !== 'Напитки'),
  )

  const tabs = [
    {
      label: (
        <p className={styles.list__item_first}>
          {isAcitve === 0 ? (
            <img src={coffeeActive} alt="coffee" />
          ) : (
            <img src={coffee} alt="coffee" />
          )}
          Кофе
        </p>
      ),
      content: <CoffeeList search={search} />,
    },
    {
      label: (
        <p className={styles.list__item}>
          {isAcitve === 1 ? (
            <img src={pastryActive} alt="pastry" />
          ) : (
            <img src={pastry} alt="coffee" />
          )}
          Выпечка
        </p>
      ),
      content: <PastryList search={search} />,
    },
    {
      label: (
        <p className={styles.list__item}>
          {isAcitve === 2 ? (
            <img src={dessertActive} alt="dessert" />
          ) : (
            <img src={dessert} alt="dessert" />
          )}
          Десерты
        </p>
      ),
      content: <DessertList search={search} />,
    },
    {
      label: (
        <p className={styles.list__item}>
          {isAcitve === 3 ? (
            <img src={drinksActive} alt="drinks" />
          ) : (
            <img src={drinks} alt="drinks" />
          )}
          Напитки
        </p>
      ),
      content: <DrinksList search={search} />,
    },
    {
      label: (
        <p
          className={styles.list__item}
          onClick={() => setGetNameCategory(filter_category[0].name)}
        >
          {isAcitve === 4 ? (
            <img src={custom_svg_active} alt="dessert" />
          ) : (
            <img src={custom_svg} alt="dessert" />
          )}
          {filter_category[0].name}
        </p>
      ),
      content: <CustomContainer getNameCategory={getNameCategory} search={search} />,
    },
    {
      label: (
        <p
          className={styles.list__item}
          onClick={() => setGetNameCategory(filter_category[1].name)}
        >
          {isAcitve === 5 ? (
            <img src={custom_svg_active} alt="dessert" />
          ) : (
            <img src={custom_svg} alt="dessert" />
          )}
          {filter_category[1].name}
        </p>
      ),
      content: <CustomContainer getNameCategory={getNameCategory} search={search} />,
    },
    {
      label: (
        <p
          className={styles.list__item}
          onClick={() => setGetNameCategory(filter_category[2].name)}
        >
          {isAcitve === 6 ? (
            <img src={custom_svg_active} alt="dessert" />
          ) : (
            <img src={custom_svg} alt="dessert" />
          )}
          {filter_category[2].name}
        </p>
      ),
      content: <CustomContainer getNameCategory={getNameCategory} search={search} />,
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

  useEffect(() => {
    dispatch(getBranchesMenu())
  }, [])

  return (
    <div className={styles.menu}>
      <header className={styles.menu__header}>
        <h3>Меню</h3>
        <div className={styles.input}>
          <SearchOutlined className={styles.input_icon} />
          <input
            type="text"
            placeholder="Поиск"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <img src={bell} alt="Error :(" width={48} />
      </header>
      <MenuTabs tabs={tabs} setIsActive={setIsActive} />
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
