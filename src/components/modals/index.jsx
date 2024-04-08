import { useSelector } from 'react-redux'
import ExitModal from './exit-modal/ExitModal'
import AddOption from './menu-modals/AddOption'
import ProductDescription from './menu-modals/ProductDescription'

const Modals = () => {
  const { isOpen, modalType, modalProps } = useSelector((state) => state.modal)

  const ModalsMap = {
    productDescription: ProductDescription,
    addOption: AddOption,
    exit: ExitModal,
  }
  const CurrentModal = modalType ? ModalsMap[modalType] : null

  return isOpen && CurrentModal ? <CurrentModal {...modalProps} /> : null
}

export default Modals
