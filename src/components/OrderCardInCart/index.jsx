import React from 'react'
import { coffee } from '../../assets/index'
import styles from './style.module.scss'

const OrderCardInCart = () => {
  return (
    <div className={styles.root}>
      <div className={styles.flex}>
        <div className={styles.imgWrapper}>
          <img src={coffee} alt="" />
        </div>
        <div className={styles.info}>
          <h3>Латте</h3>
          <p>Коровье молоко</p>
          <p>Карамельный сироп</p>
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <h3 className={styles.price}>140 с</h3>
        <div className={styles.btns}>
          <button>+</button>1<button>-</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCardInCart
