import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import styles from './loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 44,
              color: 'rgb(244, 115, 86)',
            }}
            spin
          />
        }
      />
    </div>
  )
}

export default Loading
