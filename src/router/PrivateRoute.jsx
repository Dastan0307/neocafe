import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '@utils/Cookie'

const PrivateRouter = () => {
  // const isAuth = getCookie('access')
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
