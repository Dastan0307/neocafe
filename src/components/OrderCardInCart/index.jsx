import React from 'react'
import { coffee } from '../../assets/index'
import styles from './style.module.scss'

const OrderCardInCart = ({item}) => {
  return (
    <div className={styles.root}>
      <div className={styles.flex}>
        <div className={styles.imgWrapper}>
          <img src={item.menu_detail.image} alt={item.menu_detail.name} />
        </div>
        <div className={styles.info}>
          <h3>{item.menu_detail.name}</h3>
          {item.menu_detail.ingredients.map(ingredient =>(
            <p>{ingredient.name}</p>
          ))}
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <h3 className={styles.price}>{item.menu_detail.price} с</h3>
        <div className={styles.btns}>
          <button>+</button>{item.quantity}<button>-</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCardInCart
