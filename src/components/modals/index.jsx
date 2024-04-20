import { useSelector } from 'react-redux'
import ExitModal from './exit-modal/ExitModal'
import AddOption from './menu-modals/AddOption'
import ProductDescription from './menu-modals/ProductDescription'
import CancelOrderModal from './CancelOrderModal'
import Cart from '../../screens/Cart'
import NotificationComponent from '../Notification/NotificationComponent'

const Modals = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal)

  const ModalsMap = {
    productDescription: ProductDescription,
    addOption: AddOption,
    exit: ExitModal,
    cancelOrder: CancelOrderModal,
    cart: Cart,
    notification: NotificationComponent,
  }
  const CurrentModal = modalType ? ModalsMap[modalType] : null

  return isOpen && CurrentModal ? <CurrentModal {...modalProps} /> : null
}

export default Modals
