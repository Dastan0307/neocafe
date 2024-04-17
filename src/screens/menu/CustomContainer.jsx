// import { branches_menu, category } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './menu.module.scss'

const CustomContainer = ({
  categoryName,
  search,
  products,
  setProducts,
  count,
  setCount,
}) => {
  const [id, setId] = useState(null)
  const dispatch = useDispatch()
  const { category, branches_menu } = useSelector(state => state.menu)

  const get_category_product = category.find(
    (product) => product.name === categoryName,
  )

  const get_products = branches_menu?.filter(
    (product) => product.category === get_category_product?.id,
  )

  const searchProductByName = search.toLowerCase()

  const products_db = get_products?.filter((product) =>
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

  // const handleOptionOpenModal = () => {
  //   dispatch(
  //     openModal({
  //       isOpen: true,
  //       modalType: 'addOption',
  //       modalProps: {
  //         id: id,
  //       },
  //     }),
  //   )
  // }

  const handleSum = (id) => {
    setId(id)
    // handleOptionOpenModal()
    const product = products_db.find((prod) => prod.id === id)
    setProducts((prevState) => [...prevState, product])
  }

  const addProductInStock = () => {
    setCount(count + 1)
    const product = products_db.find((prod) => prod.id === id)
    setProducts((prevState) => [...prevState, product])
  }

  const deleteOneProductInStock = () => {
    setCount(count - 1)
    setProducts((prevState) => {
      const index = prevState.findIndex((item) => item.id === id)
      if (index !== -1) {
        const newProducts = [
          ...prevState.slice(0, index),
          ...prevState.slice(index + 1),
        ]
        return newProducts
      }
      return prevState // Если элемент с заданным id не найден, возвращаем предыдущее состояние без изменений
    })
  }

  // Создаем объект для хранения количества каждого уникального продукта
  const productCountMap = {}

  // Перебираем каждый продукт в массиве
  products.forEach((product) => {
    // Если продукт еще не добавлен в объект productCountMap, добавляем его
    if (!productCountMap[product.id]) {
      productCountMap[product.id] = 1
    } else {
      // Если продукт уже добавлен в объект, увеличиваем его счетчик
      productCountMap[product.id]++
    }
  })

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
              onClick={deleteOneProductInStock}
            >
              -
            </button>
            <p>{productCountMap[id]}</p>
            <button
              className={styles.card__count_btn}
              onClick={addProductInStock}
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
