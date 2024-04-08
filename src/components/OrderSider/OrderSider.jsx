import { CloseOutlined } from '@ant-design/icons'
import addToCart from '@assets/images/add-to-cart.png'
import coffee from '@assets/images/coffee.png'
import styles from './order_sider.module.scss'

const OrderSider = ({ handleOpenSider, toggleSider }) => {
  const hasProduct = true
  return (
    <div
      className={toggleSider ? styles.order_sider : styles.order__sider_close}
    >
      <div className={styles.title}>
        <p>Заказ на вынос</p>
        <CloseOutlined className={styles.icon} onClick={handleOpenSider} />
      </div>
      {hasProduct ? (
        <div className={styles.card_list}>
          <div className={styles.cards}>
            <div className={styles.menu__sider_card}>
              <img src={coffee} alt="Error :(" width={120} height={120} />
              <div className={styles.menu_card__description}>
                <p className={styles.card_title}>Латте</p>
                <p className={styles.card_des}>Коровье молоко</p>
                <p className={styles.card_des}>Карамельный сироп</p>
              </div>
              <span>140 c</span>
              <div className={styles.card__list_count}>
                <span>+</span>
                <span>0</span>
                <span>-</span>
              </div>
            </div>
            <div className={styles.menu__sider_card}>
              <img src={coffee} alt="Error :(" width={120} height={120} />
              <div className={styles.menu_card__description}>
                <p className={styles.card_title}>Латте</p>
                <p className={styles.card_des}>Коровье молоко</p>
                <p className={styles.card_des}>Карамельный сироп</p>
              </div>
              <span>140 c</span>
              <div className={styles.card__list_count}>
                <span>+</span>
                <span>0</span>
                <span>-</span>
              </div>
            </div>
          </div>
          <button className={styles.card__list_btn}>Добавить</button>
        </div>
      ) : (
        <>
          <p className={styles.text}>Вы ещё ничего не добавили</p>
          <img src={addToCart} alt="Error :(" className={styles.add_to_card} />
        </>
      )}
      <div className={styles.footer}>
        <div className={styles.sum}>
          <span>Итого:</span>
          <span>0 сом</span>
        </div>
        {hasProduct ? (
          <button className={styles.order__btn_has_product}>
            Закрыть счёт
          </button>
        ) : (
          <button className={styles.order__sider_btn}>Закрыть счёт</button>
        )}
      </div>
    </div>
  )
}

export default OrderSider
