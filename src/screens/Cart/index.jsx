import React, { useEffect } from 'react'
import OrderCardInCart from '../../components/OrderCardInCart'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/slices/modalSlice'
import styles from './style.module.scss'
import { openOrderCart, clearItems, minusItem, plusItem } from '../../store/slices/orderCartSlice'

const Cart = ({order, handleOrderStatus, handleCancelOrder}) => {
  console.log('cart', order)
  
  const dispatch = useDispatch();
  const totalPrice = useSelector(state => state.orderCart.totalPrice)
  const items = useSelector(state => state.orderCart.items)
  
  useEffect(()=>{
    dispatch(openOrderCart(order))
  },[])

  const handleClose = () => {
    dispatch(closeModal())
    dispatch(clearItems())
  }
  const handleAcceptOrder = (id, status) => {
    handleOrderStatus(id, status)
  }

  const handleOrderCancel = (id) => {
    handleCancelOrder(id)
  }
  const handleMinusCount = (id, quantity) =>{
    if(quantity > 1){
      dispatch(minusItem(id))
    }
  }
  const handlePlusCount = (id) =>{
    dispatch(plusItem(id))
  }
  return (
    <div className={styles.root}>
      <div className={styles.title__wrapper}>
        <h2 className={styles.title}>Заказ на вынос</h2>
        <div className={styles.close} onClick={handleClose}>&times;</div>
      </div>
      <div className={styles.positionWrapper}>
        {
          items.map(item => (
            <OrderCardInCart item={item} handleMinusCount={handleMinusCount} handlePlusCount={handlePlusCount}/>
          ))
        }
      </div>
      <button className={styles.addBtn}>Добавить</button>
      <div>
        <div className={styles.total__wrapper}>
          <h3 className={styles.total__text}>Итого</h3>
          <h3 className={styles.total__number}>{totalPrice} сом</h3>
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
