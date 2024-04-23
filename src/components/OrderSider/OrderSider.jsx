import { CloseOutlined } from '@ant-design/icons'
import addToCart from '@assets/images/add-to-cart.png'
import { useState } from 'react'
import styles from './order_sider.module.scss'

const OrderSider = ({
  handleOpenSider,
  toggleSider,
  products,
  setProducts,
  count,
  setCount,
  handleCloseSider,
}) => {
  const [items, setItems] = useState([
    {
      menu_id: null,
      quantity: 0,
      extra_product: [
        {
          id: 0,
          quantity: 0,
        },
      ],
    },
  ])

  // Функция для добавления уникальных продуктов в items
  const addUniqueProductsToItems = () => {
    // Создаем объект для хранения количества каждого уникального продукта
    const productCountMap = {}

    // Перебираем каждый элемент массива items
    items.forEach((item) => {
      const productId = item.menu_id
      const quantity = item.quantity
      // Если продукт уже добавлен в объект, увеличиваем его счетчик
      if (productCountMap[productId]) {
        productCountMap[productId] += quantity
      } else {
        // Если продукта еще нет в объекте, добавляем его
        productCountMap[productId] = quantity
      }
    })

    // Создаем новый массив items на основе уникальных продуктов и их количества
    const uniqueItems = Object.entries(productCountMap).map(
      ([productId, quantity]) => ({
        menu_id: productId,
        quantity: quantity,
        extra_product: [],
      }),
    )

    // Обновляем состояние items
    setItems(uniqueItems)
  }

  const addProductInStock = (id) => {
    setCount(count + 1)
    const product = products.find((prod) => prod.id === id)
    setProducts((prevState) => [...prevState, product])
  }

  const deleteOneProductInStock = (id) => {
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

  const uniqueProductsSet = new Set(products.map((product) => product))

  // Преобразуем Set обратно в массив
  const uniqueProducts = [...uniqueProductsSet]

  const totalSum = products.reduce(
    (prod, currentProd) => prod + +currentProd.price,
    0,
  )

  const handleClearStock = () => {
    setProducts([])
    handleCloseSider()
  }

  return (
    <div
      className={toggleSider ? styles.order_sider : styles.order__sider_close}
    >
      <div className={styles.title}>
        <p>Заказ на вынос</p>
        <CloseOutlined className={styles.icon} onClick={handleOpenSider} />
      </div>
      {uniqueProducts.length ? (
        <div className={styles.card_list}>
          <div className={styles.cards}>
            {uniqueProducts?.map((product) => (
              <div className={styles.menu__sider_card} key={product.id}>
                <img
                  src={product.image}
                  alt="Error :("
                  width={120}
                  height={120}
                  style={{ borderRadius: '14px' }}
                />
                <div className={styles.menu_card__description}>
                  <p className={styles.card_title}>{product.name}</p>
                  <p className={styles.card_des}>Коровье молоко</p>
                  <p className={styles.card_des}>Карамельный сироп</p>
                </div>
                <span>{product.price} c</span>
                <div className={styles.card__list_count}>
                  <span onClick={() => addProductInStock(product.id)}>+</span>
                  <span>{productCountMap[product.id]}</span>
                  <span onClick={() => deleteOneProductInStock(product.id)}>
                    -
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            className={styles.card__list_btn}
            onClick={addUniqueProductsToItems}
          >
            Добавить
          </button>
        </div>
      ) : (
        <>
          <p className={styles.text}>Вы ещё ничего не добавили</p>
          <img src={addToCart} alt="Error :(" className={styles.add_to_card} />
        </>
      )}
      <div className={styles.footer}>
        <div className={styles.sum}>
          <span>Итого:</span>
          <span>{totalSum} сом</span>
        </div>
        {uniqueProducts.length ? (
          <button
            className={styles.order__btn_has_product}
            onClick={handleClearStock}
          >
            Закрыть счёт
          </button>
        ) : (
          <button className={styles.order__sider_btn}>Закрыть счёт</button>
        )}
      </div>
    </div>
  )
}

export default OrderSider
