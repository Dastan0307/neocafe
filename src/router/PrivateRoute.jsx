import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
  // const isAuth = getCookie('isAuth')
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
