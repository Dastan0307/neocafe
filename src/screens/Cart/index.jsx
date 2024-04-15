import React from 'react'
import OrderCardInCart from '../../components/OrderCardInCart'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/slices/modalSlice'
import styles from './style.module.scss'

const Cart = ({order}) => {
  console.log('cart', order)
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal())
  }
  return (
    <div className={styles.root}>
      <div className={styles.title__wrapper}>
        <h2 className={styles.title}>Заказ на вынос</h2>
        <div className={styles.close} onClick={handleClose}>&times;</div>
      </div>
      <div className={styles.positionWrapper}>
        {
          order.items.map(item => (
            <OrderCardInCart item={item}/>
          ))
        }
      </div>
      <button className={styles.addBtn}>Добавить</button>
      <div>
        <div className={styles.total__wrapper}>
          <h3 className={styles.total__text}>Итого</h3>
          <h3 className={styles.total__number}>{parseFloat(+order.total_price).toFixed(2)} сом</h3>
        </div>
        <button className={styles.closeBillBtn}>Закрыть счет</button>
      </div>
    </div>
  )
}

export default Cart
