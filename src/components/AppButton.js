import React, { useState } from 'react'
import { CButton } from '@coreui/react'

const MyButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <CButton onClick={handleClick} disabled={isLoading}>
      {isLoading ? <i className="spinner-icon"></i> : 'Click Me'}
    </CButton>
  )
}

export default MyButton
