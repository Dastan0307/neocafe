import { branch_category, category } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.module.scss'

const CustomContainer = ({ getNameCategory, search }) => {
  const dispatch = useDispatch()
  // const { category, branch_menu } = useSelector(state => state.menu)
  const [id, setId] = useState(null)
  const [count, setCount] = useState(1)

  const get_category_product = category.find((product) => product.name === getNameCategory)

  const get_products = branch_category.filter(
    (product) => product.category === get_category_product?.id,
  )

  const searchProductByName = search.toLowerCase()

  const products_db = get_products.filter((product) =>
    product.name.toLowerCase().includes(searchProductByName),
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
      {products_db?.map((product) => (
        <div
          className={product.id === id ? styles.card_count : styles.menu_card}
          key={product.id}
        >
          <div
            className={
              product.id === id
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
            src={product.image}
            alt="Error :("
            onClick={() => handleOpenModal(product.id)}
          />
          <div className={styles.description}>
            <p className={styles.title}>{product.name}</p>
            <p className={styles.price}>{product.price} с</p>
          </div>
          <div className={styles.plus} onClick={() => handleSum(product.id)}>
            +
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomContainer