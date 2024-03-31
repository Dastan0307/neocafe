import { getProfileUser } from '@store/slices/authSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './profile.module.scss'

const ProfileBarmen = () => {
  const data = useSelector((state) => state.auth.userProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileUser())
  }, [])

  return (
    <div className={styles.profile_barmen}>
      <h4>Личные данные</h4>
      <div className={styles.inps}>
        <div className={styles.inp}>
          <span>Имя</span>
          <input type="text" placeholder="" value={data.first_name} />
        </div>
        <div className={styles.inp}>
          <span>Фамилия</span>
          <input type="text" placeholder="" />
        </div>
        <div className={styles.inp}>
          <span>Почта</span>
          <input type="text" placeholder="" value={data.email} />
        </div>
        <div className={styles.inp}>
          <span>Дата рождения</span>
          <input type="text" placeholder="" value={data.birth_date} />
        </div>
      </div>
    </div>
  )
}

export default ProfileBarmen
