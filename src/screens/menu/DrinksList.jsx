import { branch_category, category } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.module.scss'

const DrinksList = ({ search }) => {
  const dispatch = useDispatch()
  // const { category, branch_menu } = useSelector(state => state.menu)
  const [id, setId] = useState(null)
  const [count, setCount] = useState(1)

  const get_category_drink = category.find((drink) => drink.name === 'Напитки')

  const get_drinks = branch_category.filter(
    (drink) => drink.category === get_category_drink?.id,
  )

  const searchDrink = search.toLowerCase()

  const drinks_db = get_drinks.filter((drink) =>
    drink.name.toLowerCase().includes(searchDrink),
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
      {drinks_db?.map((drink) => (
        <div
          className={drink.id === id ? styles.card_count : styles.menu_card}
          key={drink.id}
        >
          <div
            className={
              drink.id === id
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
            src={drink.image}
            alt="Error :("
            onClick={() => handleOpenModal(drink.id)}
          />
          <div className={styles.description}>
            <p className={styles.title}>{drink.name}</p>
            <p className={styles.price}>{drink.price} с</p>
          </div>
          <div className={styles.plus} onClick={() => handleSum(drink.id)}>
            +
          </div>
        </div>
      ))}
    </div>
  )
}

export default DrinksList
