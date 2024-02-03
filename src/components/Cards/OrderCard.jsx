import { Card, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './card.module.scss'

export const OrderCard = () => {
  return (
    <Card bordered={false} className={styles.card__order}>
      <Typography.Title level={3}>
        М-47 <CloseOutlined />
      </Typography.Title>
    </Card>
  )
}
