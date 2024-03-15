import React from 'react'
import OrderCardInCart from '../../components/OrderCardInCart'
import styles from './style.module.scss'
const Cart = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title__wrapper}>
        <h2 className={styles.title}>Заказ на вынос</h2>
        <div className={styles.close}>&times;</div>
      </div>
      <div className={styles.positionWrapper}>
        <OrderCardInCart/>
        <OrderCardInCart/>
        <OrderCardInCart/>
        <OrderCardInCart/>
      </div>
      <button className={styles.addBtn}>Добавить</button>
      <div>
        <div className={styles.total__wrapper}>
          <h3 className={styles.total__text}>Итого</h3>
          <h3 className={styles.total__number}>570 сом</h3>
        </div>
        <button className={styles.closeBillBtn}>Закрыть счет</button>
      </div>
    </div>
  )
}

export default Cart
