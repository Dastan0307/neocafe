import React, { useEffect } from 'react'
import OrderCardInCart from '../../components/OrderCardInCart'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/slices/modalSlice'
import styles from './style.module.scss'
import { openOrderCart, clearItems } from '../../store/slices/orderCartSlice'

const Cart = ({order, handleOrderStatus, handleCancelOrder}) => {
  console.log('cart', order)
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(openOrderCart(order))
  },[])

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(clearItems())
  }
  const handleAcceptOrder = (id, status) => {
    console.log('accept', id, status)
    handleOrderStatus(id, status)
  }

  const handleOrderCancel = (id) => {
    console.log('cancel', id)

    handleCancelOrder(id)
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
        <div className={styles.btn__wrapper}>
          <button
            className={styles.btn__white}
            onClick={() => handleOrderCancel(order.id)}
          >
            Отменить заказ
          </button>
          <button className={styles.btn__red} onClick={()=>handleAcceptOrder(order.id, order.status)}>Принять</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
