import styles from './profile.module.scss'

const ProfileBarmen = () => {
  return (
    <div className={styles.profile_barmen}>
      <h4>Личные данные</h4>
      <div className={styles.inps}>
        <div className={styles.inp}>
          <span>Имя</span>
          <input type="text" placeholder="  " />
        </div>
        <div className={styles.inp}>
          <span>Фамилия</span>
          <input type="text" placeholder="" />
        </div>
        <div className={styles.inp}>
          <span>Номер телефона</span>
          <input type="text" placeholder="" />
        </div>
        <div className={styles.inp}>
          <span>Дата рождения</span>
          <input type="text" placeholder="" />
        </div>
      </div>
    </div>
  )
}

export default ProfileBarmen
