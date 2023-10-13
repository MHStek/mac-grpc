import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const DefaultLayout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customerInfo = useSelector((state) => state.customerInfo)

  useEffect(() => {
    if (!customerInfo.issuccess && customerInfo.messagesuccessfulorfailed !== 'SUCCESSFUL') {
      navigate('/login')
    }

    return () => {
      dispatch({ type: 'logOut' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerInfo.issuccess, customerInfo.messagesuccessfulorfailed])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
