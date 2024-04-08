import { CloseOutlined } from '@ant-design/icons'
import { closeModal } from '@store/slices/modalSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu-modal.module.scss'

const AddOption = () => {
  const dispatch = useDispatch()
  const [optionCount, setOptionCount] = useState(1)

  const handlePlusOptionCount = () => {
    setOptionCount(optionCount + 1)
  }
  const handleMinusOptionCount = () => {
    setOptionCount(optionCount - 1)
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return (
    <div className={styles.container}>
      <div className={styles.add_option}>
        <h3 className={styles.add__option_title}>
          Выберите опции{' '}
          <CloseOutlined
            className={styles.add__option_icon}
            onClick={handleCloseModal}
          />
        </h3>
        <span className={styles.title_span}>Молоко</span>
        <div className={styles.add__option_inps}>
          <div className={styles.add__option_inp}>
            <label className={styles.round_checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <p>
              коровье <span>+0 с</span>
            </p>
          </div>
          <div className={styles.add__option_inp}>
            <label className={styles.round_checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <p>
              овсяное <span>+0 с</span>
            </p>
          </div>
          <div className={styles.add__option_add__option_inp_m}>
            <label className={styles.round_checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <p>
              соевое <span>+0 с</span>
            </p>
          </div>
        </div>

        <span className={styles.title_span}>Сиропы</span>
        <div className={styles.query__inps}>
          <div className={styles.add__option_inp}>
            <label className={styles.query_checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <p>
              Клубничный <span>+30 с</span>
            </p>
          </div>
          <div className={styles.add__option_inp}>
            <label className={styles.query_checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
            </label>
            <p>
              Карамельный <span>+50 с</span>
            </p>
          </div>
        </div>
        <div className={styles.add__option_btns}>
          {/* надо поменять кнопку на тект или на блок  */}
          <button className={styles.add__option_count}>
            <span onClick={handleMinusOptionCount}>-</span>
            {optionCount}
            <span onClick={handlePlusOptionCount}>+</span>
          </button>
          <button className={styles.add__option_btn}>Добавить</button>
        </div>
      </div>
    </div>
  )
}

export default AddOption
