import { branch_category, category } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.module.scss'

const DessertList = ({ search }) => {
  const dispatch = useDispatch()
  // const { category, branch_menu } = useSelector(state => state.menu)
  const [id, setId] = useState(null)
  const [count, setCount] = useState(1)

  const get_category_desert = category.find(
    (dessert) => dessert.name === 'Десерт',
  )

  const get_desserts = branch_category.filter(
    (dessert) => dessert.category === get_category_desert.id,
  )

  const searchCoffee = search.toLowerCase()

  const deserts_db = get_desserts.filter((dessert) =>
    dessert.name.toLowerCase().includes(searchCoffee),
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
      {deserts_db?.map((dessert) => (
        <div
          className={dessert.id === id ? styles.card_count : styles.menu_card}
          key={dessert.id}
        >
          <div
            className={
              dessert.id === id
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
            src={dessert.image}
            alt="Error :("
            onClick={() => handleOpenModal(dessert.id)}
          />
          <div className={styles.description}>
            <p className={styles.title}>{dessert.name}</p>
            <p className={styles.price}>{dessert.price} с</p>
          </div>
          <div className={styles.plus} onClick={() => handleSum(dessert.id)}>
            +
          </div>
        </div>
      ))}
    </div>
  )
}

export default DessertList
