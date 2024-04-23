import { notification } from 'antd'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const NotificationComponent = () => {
	const { id } = useSelector(state => state.user.userId)
	useEffect(() => {
		const ws = new WebSocket(`wss://helsinki-backender.org.kg/ws/barmen/60/`)

		ws.onopen = () => {
			console.log('Connected to server')
		}

		ws.onmessage = event => {
			const data = JSON.parse(event.data)
			if (data.notifications.length > 1) {
				const noti = data.notifications[data.notifications.length - 1]
				notification.open({
					message: noti.title,
					description: noti.description,
					onClick: () => {
						console.log('Notification Clicked!')
					},
				})
			}

			if (data.notifications.length) {
				const [{ id, title, description }] = data.notifications
				notification.open({
					message: title,
					description: description,
					onClick: () => {
						console.log('Notification Clicked!')
					},
				})
			}
		}

		ws.onclose = () => {
			console.log('Disconnected from server')
		}

		return () => {
			ws.close()
		}
	}, [])

	return <div></div>
}

export default NotificationComponent
