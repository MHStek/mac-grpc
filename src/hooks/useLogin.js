import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CustomerAccountClient } from 'src/layout/protos-gen/Customer_grpc_web_pb'
import { LoginRequestMessage } from 'src/layout/protos-gen/Customer_pb'

const useLogin = (url) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const client = new CustomerAccountClient(url, null, null)
  const [errorMSG, setErrorMSG] = useState({})

  function setLogin(data) {
    const request = new LoginRequestMessage()
    request.setCountrycode(data.country)
    request.setCustomerid(data.username)
    request.setLanguageid('en')
    request.setMobileorweb('WEB')
    request.setPassword1orpin2orhpin3option(1)
    request.setPasswordorpin(data.password)
    request.setPersonalbusinessgroupvalue(2)

    const metadata = {
      eganowappcustkey: 'keY-a6ee91c7-493a-4e0d-814d-06919674cea1-a0UoThthyys30a-Ey',
      eganowapppassword: 'passW-5e4cd4d1-515b-4047-aa63-288be83e44ff-x001223Th76x-Word',
    }

    client.loginUserBusiness(request, metadata, (err, response) => {
      if (err) {
        console.error(err.message)
        return
      }

      const obj = response.toObject()

      if (obj.issuccess && obj.messagesuccessfulorfailed === 'SUCCESSFUL') {
        dispatch({ type: 'setCustomerInfo', customerInfo: obj })
        navigate('/')
      } else {
        setErrorMSG({
          state: obj.messagesuccessfulorfailed,
          message: obj.message,
        })
      }
    })
  }

  return [errorMSG, setLogin]
}

export default useLogin
