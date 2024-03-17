import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {
  // const isAuth = useSelector((state) => state.user.isAuth);
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRouter
