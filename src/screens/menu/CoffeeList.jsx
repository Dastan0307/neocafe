import { data_coffee } from '@api/menu_products_data'
import { openModal } from '@store/slices/modalSlice'
import { useDispatch } from 'react-redux'
import styles from './menu.module.scss'

const CoffeeList = () => {
  const dispatch = useDispatch()

  const handleOpenModal = (id) => {
    dispatch(
      openModal({
        isOpen: true,
        modalType: 'productDescription',
        modalProps: {
          id: id
        },
      }),
    )
  }

  const handleSum = (e) => {
    console.log(e.target.id)
  }

  return (
    <div className={styles.menu_container}>
      {/* <AddOption />
      <button onClick={handleOpenModal}>click me</button */}
      {data_coffee?.map((coffee) => {
        return (
          <div className={styles.menu_card} key={coffee.id}>
            <img src={coffee.image} alt="Error :(" onClick={() => handleOpenModal(coffee.id)} />
            <div className={styles.description}>
              <p className={styles.title}>{coffee.name}</p>
              <p className={styles.price}>140 с</p>
            </div>
            <div className={styles.plus} onClick={handleSum}>
              +
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CoffeeList
