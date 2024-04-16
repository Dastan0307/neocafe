import { CloseOutlined } from '@ant-design/icons'
import { closeModal } from '@store/slices/modalSlice.js'
import { removeCookie } from '@utils/Cookie'
import { useDispatch } from 'react-redux'
import styles from './exit_modal.module.scss'

const ExitModal = () => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleLogout = () => {
    removeCookie('access')
    removeCookie('email')
    removeCookie('isAuth')
    removeCookie('pre_token')
    removeCookie('refresh')
    handleCloseModal()
    window.location.reload()
  }

  return (
    <div className={styles.container}>
      <div className={styles.exit_modal}>
        <h3>
          Выход из учётной записи{' '}
          <CloseOutlined
            className={styles.exit__modal_icon}
            onClick={handleCloseModal}
          />
        </h3>
        <p>Вы действительно хотите выйти из учётной записи?</p>
        <div className={styles.btns}>
          <button onClick={handleLogout}>Да</button>
          <button onClick={handleCloseModal}>Нет</button>
        </div>
      </div>
    </div>
  )
}

export default ExitModal
