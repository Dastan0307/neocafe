import { branch_category, category } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.module.scss'

const CoffeeList = ({ search }) => {
  const dispatch = useDispatch()
  // const { category, branch_menu } = useSelector(state => state.menu)
  const [id, setId] = useState(null)
  const [count, setCount] = useState(1)

  const searchCoffee = search.toLowerCase()

  const get_category_coffee = category.find((coffee) => coffee.name === 'Кофе')

  const get_coffee = branch_category.filter(
    (coffee) => coffee.category === get_category_coffee.id,
  )

  const coffee_db = get_coffee.filter((coffee) =>
    coffee.name.toLowerCase().includes(searchCoffee),
  )

  const handleOpenModal = (id) => {
    dispatch(
      openModal({
        isOpen: true,
        modalType: 'productDescription',
        modalProps: {
          id: id,
        },
      }),
    )
  }

  const handleSum = (id) => {
    setId(id)
  }

  useEffect(() => {
    setCount(1)
  }, [id])

  useEffect(() => {
    if (count === 0) {
      setId(null)
    }
  }, [count])

  return (
    <div className={styles.menu_container}>
      {coffee_db?.map((coffee) => (
        <div
          className={coffee.id === id ? styles.card_count : styles.menu_card}
          key={coffee.id}
        >
          <div
            className={
              coffee.id === id
                ? styles.card__count_number
                : styles.card__count_none
            }
          >
            <button
              className={styles.card__count_btn}
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
            <p>{count}</p>
            <button
              className={styles.card__count_btn}
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
          </div>
          <img
            src={coffee.image}
            alt="Error :("
            onClick={() => handleOpenModal(coffee.id)}
          />
          <div className={styles.description}>
            <p className={styles.title}>{coffee.name}</p>
            <p className={styles.price}>{coffee.price} с</p>
          </div>
          <div className={styles.plus} onClick={() => handleSum(coffee.id)}>
            +
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoffeeList
