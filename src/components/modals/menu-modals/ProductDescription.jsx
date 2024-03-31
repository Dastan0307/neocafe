import { CloseOutlined } from '@ant-design/icons'
import coffee from '@assets/images/coffee.png'
import { closeModal } from '@store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { data_coffee } from '@api/menu_products_data'
import styles from './menu-modal.module.scss'

const ProductDescription = ({ id }) => {
  const dispatch = useDispatch()

  const cofee_description = data_coffee.find((coffee) => coffee.id === id)

  console.log(cofee_description)

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return (
    <div className={styles.container}>
      <div className={styles.product_description}>
        <h3 className={styles.product__description_title}>
          {cofee_description.name}
          <CloseOutlined
            className={styles.product__description_icon}
            onClick={handleCloseModal}
          />
        </h3>
        <div className={styles.product__description_image}>
          <img src={cofee_description.image} alt="Error :(" />
          <div className={styles.description}>
            {cofee_description.description}
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
