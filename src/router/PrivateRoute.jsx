import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '@utils/Cookie'

const PrivateRouter = () => {
  const isAuth = Boolean(getCookie('isAuth'))

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
