import { CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../store/slices/modalSlice.js'
import {
  deleteAllNotifications,
  deleteOneNotification,
  getNotifications,
} from '../../store/slices/notificationSlice.js'
import styles from './notification.module.scss'

const NotificationComponent = () => {
  const notification = useSelector((state) => state.notification.notifications)
  const dispatch = useDispatch()

  const data = Array.from(notification || [])
  const notifications = data.reverse()

  const closeModalNotification = () => {
    dispatch(closeModal())
  }

  const handleGetNotifications = () => {
    dispatch(getNotifications())
  }

  const handleDeleteOneNotification = (id) => {
    dispatch(deleteOneNotification({ id, handleGetNotifications }))
  }

  const handleDeleteAllNotifications = () => {
    dispatch(deleteAllNotifications(handleGetNotifications))
  }

  useEffect(() => {
    handleGetNotifications()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.notification}>
        <div className={styles.title}>
          <p>
            Уведомления{' '}
            <CloseOutlined
              className={styles.close_icon}
              onClick={closeModalNotification}
            />
          </p>
          <div className={styles.notification_line}></div>
          <button
            className={styles.notification__btn_clear}
            onClick={handleDeleteAllNotifications}
          >
            Очистить
          </button>
        </div>
        <div className={styles.card_list}>
          {notifications?.map((notification) => (
            <div key={notification.id} className={styles.notification__card}>
              <div className={styles.notification__time}>
                <p>
                  <span>{notification?.timestamp.split(' ')[0]}</span>
                  <span className={styles.time__query}></span>
                  <span>{notification?.timestamp?.split(' ')[1]}</span>
                </p>
                <CloseOutlined
                  width={24}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteOneNotification(notification.id)}
                />
              </div>
              <p className={styles.product_name}>
                {notification.title} <span>{notification.description}</span>
              </p>
              <p className={styles.product_name}>
                Филиал: <span>NeoCafe Dzerzhinka</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationComponent
