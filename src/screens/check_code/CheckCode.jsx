import React, { useState, useRef } from 'react'
import { LoginButton } from '@components/Buttons/LoginButton'

const CheckCode = () => {
  const [code, setCode] = useState(['', '', '', ''])
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()))

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

  const handleCodeCheck = () => {}
  return (
    <div className="">
      <form>
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(event) => handleInputChange(index, event)}
            onKeyDown={(event) => handleBackspace(index, event)}
            ref={inputRefs.current[index]}
          />
        ))}
      </form>
      <LoginButton onClick={handleCodeCheck}>Войти</LoginButton>
    </div>
  )
}

export default CheckCode
