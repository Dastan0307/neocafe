import React, { useState, useRef, useEffect } from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginButton } from '@components/Buttons/LoginButton'
import { neocafeLogo, loginImg } from '@assets'
import { checkCode, retrieveСode } from '@store/slices/authSlice'
import { getCookie } from '../../../hooks/Cookie'
import styles from '../auth.module.scss'

const CheckCode = () => {
  const [code, setCode] = useState(['', '', '', ''])
  const [isCodeTrue, setIsCodeTrue] = useState(false)
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()))

  const disptach = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (index, event) => {
    const value = event.target.value

    if (value.match(/^\d+$/)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      if (value && index < code.length - 1) {
        inputRefs.current[index + 1].current.focus()
      }
    }
  }

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace') {
      const newCode = [...code]
      newCode[index] = ''

      setCode(newCode)

      if (index > 0) {
        inputRefs.current[index - 1].current.focus()
      }
    }
  }

  const handleCodeCheck = () => {
    const code_active = code.join('')
    const email = getCookie('email')

    const formData = new FormData()
    formData.append('otp', code_active)
    formData.append('email', email)

    disptach(checkCode({ formData, navigate, setIsCodeTrue }))
  }

  const handleCodeCheckEnter = (event) => {
    if (event.key === 'Enter') {
      const code_active = code.join('')
      const email = getCookie('email')

      const formData = new FormData()
      formData.append('otp', code_active)
      formData.append('email', email)

      disptach(checkCode({ formData, navigate, setIsCodeTrue }))
    }
  }

  const handleRetrieveСode = () => {
    disptach(retrieveСode())
  }

  useEffect(() => {
    if (isCodeTrue) {
      setIsCodeTrue(false)
    }
  }, [code])

  return (
    <div className={styles.container}>
      <img
        src={loginImg}
        alt="Error :("
        style={{ width: '724px', height: '868px' }}
      />
      <div className={styles.code_form}>
        <img src={neocafeLogo} alt="Error :(" className={styles.code_logo} />

        <Typography.Title level={1} className={styles.code_title}>
          Код подтверждения
        </Typography.Title>
        {isCodeTrue ? (
          <Typography.Text className={styles.code__text_error}>
            Код неверный, попробуйте ещё раз
          </Typography.Text>
        ) : (
          ''
        )}
        <form className={styles.code_inps} onKeyPress={handleCodeCheckEnter}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(event) => handleInputChange(index, event)}
              onKeyDown={(event) => handleBackspace(index, event)}
              ref={inputRefs.current[index]}
              placeholder="_"
              className={styles.code_inp}
              style={
                isCodeTrue
                  ? { color: 'rgba(244, 86, 86, 1)' }
                  : { color: 'rgba(42, 52, 64, 1)' }
              }
            />
          ))}
        </form>
        <LoginButton onClick={handleCodeCheck}>Войти</LoginButton>
        <button
          className={styles.code_btn}
          style={
            isCodeTrue
              ? { color: 'rgba(244, 86, 86, 1)' }
              : { color: 'rgba(95, 99, 102, 1)' }
          }
          onClick={handleRetrieveСode}
        >
          Отправить повторно
        </button>
      </div>
    </div>
  )
}

export default CheckCode
