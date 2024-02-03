import { Routes, Route } from 'react-router-dom'
import Main from '@screens/main/Main'
import CheckCode from '@screens/check_code/CheckCode'

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: '/',
      element: <Main />,
      id: 1,
    },
    {
      link: '/code',
      element: <CheckCode />,
      id: 2,
    },
  ]

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  )
}

export default MainRoutes
