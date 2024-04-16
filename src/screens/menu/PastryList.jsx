import { branch_category, category } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.module.scss'

const PastryList = ({ search }) => {
  const dispatch = useDispatch()
  // const { category, branch_menu } = useSelector(state => state.menu)
  const [id, setId] = useState(null)
  const [count, setCount] = useState(1)

  const get_category_bake = category.find((bake) => bake.name === 'Выпечка')

  const get_bakes = branch_category.filter(
    (bake) => bake.category === get_category_bake?.id,
  )

  const searchBake = search.toLowerCase()

  const bake_db = get_bakes.filter((bake) =>
    bake.name.toLowerCase().includes(searchBake),
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
      {bake_db?.map((bake) => (
        <div
          className={bake.id === id ? styles.card_count : styles.menu_card}
          key={bake.id}
        >
          <div
            className={
              bake.id === id
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
            src={bake.image}
            alt="Error :("
            onClick={() => handleOpenModal(bake.id)}
          />
          <div className={styles.description}>
            <p className={styles.title}>{bake.name}</p>
            <p className={styles.price}>{bake.price} с</p>
          </div>
          <div className={styles.plus} onClick={() => handleSum(bake.id)}>
            +
          </div>
        </div>
      ))}
    </div>
  )
}

export default PastryList
