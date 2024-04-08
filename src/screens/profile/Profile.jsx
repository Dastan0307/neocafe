import bell from '@assets/images/Bell.svg'
import ProfileBarmen from './ProfileBarmen'
import ProfileTabs from './ProfileTabs'
import WorkSchedule from './WorkSchedule'
import styles from './profile.module.scss'

const Profile = () => {
  const tabs = [
    {
      label: <p className={styles.list__item_first}>Профиль</p>,
      content: <ProfileBarmen />,
    },
    {
      label: <p className={styles.list__item_first}>График работы</p>,
      content: <WorkSchedule />,
    },
  ]

  return (
    <div className={styles.profile}>
      <p className={styles.profile__title}>Профиль</p>
      <ProfileTabs tabs={tabs} />
      <img src={bell} alt="Error :( " className={styles.profile_icon} />
    </div>
  )
}

export default Profile
