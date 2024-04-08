import { CloseOutlined } from '@ant-design/icons'
import { getProductById } from '@store/slices/menuSlice'
import { closeModal } from '@store/slices/modalSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './menu-modal.module.scss'

const ProductDescription = ({ id }) => {
  const dispatch = useDispatch()
  const coffee_description = useSelector((state) => state.menu.one_product)

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  useEffect(() => {
    dispatch(getProductById(id))
  }, [id, ])

  return (
    <div className={styles.container}>
      <div className={styles.product_description}>
        <h3 className={styles.product__description_title}>
          {coffee_description?.name}
          <CloseOutlined
            className={styles.product__description_icon}
            onClick={handleCloseModal}
          />
        </h3>
        <div className={styles.product__description_image}>
          <img src={coffee_description?.image} alt="Error :(" />
          <div className={styles.description}>
            {coffee_description?.description}
          </div>
        </div>
        <p className={styles.list__title}>Основные ингредиенты:</p>
        <ul className={styles.product__description_ingredients}>
          <li> - печенье (песочное) – 300 гр;</li>
          <li> - сливочное масло – 100 гр;</li>
          <li> - мускатный орех</li>
        </ul>
        <button className={styles.product__description_btn}>Добавить</button>
      </div>
    </div>
  )
}

export default ProductDescription
