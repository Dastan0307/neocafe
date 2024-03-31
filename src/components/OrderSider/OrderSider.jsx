import { CloseOutlined } from '@ant-design/icons'
import addToCart from '@assets/images/add-to-cart.png'
import styles from './order_sider.module.scss'

const OrderSider = ({ handleOpenSider, toggleSider }) => {
  return (
    <div
      className={toggleSider ? styles.order_sider : styles.order__sider_close}
    >
      <div className={styles.title}>
        <p>Заказ на вынос</p>
        <CloseOutlined className={styles.icon} onClick={handleOpenSider} />
      </div>
      <p className={styles.text}>Вы ещё ничего не добавили</p>
      <img src={addToCart} alt="Error :(" className={styles.add_to_card} />
      <div className={styles.sum}>
        <span>Итого:</span>
        <span>0 сом</span>
      </div>
      <button className={styles.order__sider_btn}>Закрыть счёт</button>
    </div>
  )
}

export default OrderSider
