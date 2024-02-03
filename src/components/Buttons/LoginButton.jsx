import { Button } from 'antd'
import styles from './login-button.module.scss'

export const LoginButton = (props) => {
  return (
    <Button className={styles.login_btn} {...props}>
      {props.children}
    </Button>
  )
}
