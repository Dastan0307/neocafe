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
import OrderSider from '@components/OrderSider/OrderSider'
import { getBranchesMenu } from '@store/slices/menuSlice'
import { getCookie } from '@utils/Cookie.js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/slices/menuSlice'
import CustomContainer from './CustomContainer'
import MenuTabs from './MenuTabs'
import styles from './menu.module.scss'

const Menu = () => {
  const dispatch = useDispatch()
  const username = getCookie('email')
  const { category } = useSelector((state) => state.menu)

  const [toggleSider, setToggleSider] = useState(false)
  const [isAcitve, setIsActive] = useState(0)
  const [search, setSearch] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(1)
  const [items, setItems] = useState([
    {
      menu_id: 0,
      quantity: 2147483647,
      extra_product: [
        {
          id: 0,
          quantity: 0,
        },
      ],
    },
  ])

  const filter_category = category.filter(
    (category) =>
      (category?.name !== 'Кофе') &
      (category?.name !== 'Десерт') &
      (category?.name !== 'Выпечка') &
      (category?.name !== 'Напитки'),
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
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName="Кофе"
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
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
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName="Выпечка"
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
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
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName="Десерт"
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
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
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName="Напитки"
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
    },
    {
      label: (
        <p
          className={styles.list__item}
          onClick={() => setCategoryName(filter_category[0].name)}
        >
          {isAcitve === 4 ? (
            <img src={custom_svg_active} alt="dessert" />
          ) : (
            <img src={custom_svg} alt="dessert" />
          )}
          {filter_category[0]?.name}
        </p>
      ),
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName={categoryName}
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
    },
    {
      label: FileReader[1] ? (
        <p
          className={styles.list__item}
          onClick={() => setCategoryName(filter_category[1].name)}
        >
          {isAcitve === 5 ? (
            <img src={custom_svg_active} alt="dessert" />
          ) : (
            <img src={custom_svg} alt="dessert" />
          )}
          {filter_category[1]?.name}
        </p>
      ) : null,
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName={categoryName}
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
    },
    {
      label: filter_category[2] ? (
        <p
          className={styles.list__item}
          onClick={() => setCategoryName(filter_category[2].name)}
        >
          {isAcitve === 6 ? (
            <img src={custom_svg_active} alt="dessert" />
          ) : (
            <img src={custom_svg} alt="dessert" />
          )}
          {filter_category[2]?.name}
        </p>
      ) : null,
      content: (
        <CustomContainer
          products={products}
          setProducts={setProducts}
          categoryName={categoryName}
          search={search}
          count={count}
          setCount={setCount}
        />
      ),
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

  const totalSum = products.reduce(
    (prod, currentProd) => prod + +currentProd.price,
    0,
  )

  useEffect(() => {
    dispatch(getBranchesMenu())
    dispatch(getCategory())
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
        Заказ на вынос <span>{totalSum} сом</span>
      </button>
      {toggleSider && (
        <OrderSider
          setProducts={setProducts}
          handleOpenSider={handleOpenSider}
          toggleSider={toggleSider}
          items={items}
          setItems={setItems}
          count={count}
          setCount={setCount}
          products={products}
        />
      )}
    </div>
  )
}

export default Menu
