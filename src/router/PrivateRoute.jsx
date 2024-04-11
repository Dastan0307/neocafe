import { Navigate, Outlet } from 'react-router-dom'
import {getCookie} from '../untils/Cookie';

const PrivateRouter = () => {
  const isAuth = Boolean(getCookie('isAuth'))
  // const isAuth = false

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
