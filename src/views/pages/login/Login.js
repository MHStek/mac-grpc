import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'

import useCountries from 'src/hooks/useCountries'

import { CustomerAccountClient } from 'src/layout/protos-gen/Customer_grpc_web_pb'
import { LoginRequestMessage } from 'src/layout/protos-gen/Customer_pb'

const url = 'https://egamaingrpcapiforeganowappsv1.azurewebsites.net/'

/*  


*/
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [countryOption] = useCountries(url)
  const client = new CustomerAccountClient(url, null, null)
  const [errorMSG, setErrorMSG] = useState({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()

  /*  */
  const login = (data) => {
    //Set request message
    const request = new LoginRequestMessage()
    //Add data
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
        console.log(err.message)
        return
      }
      const obj = response.toObject()
      //Construct the country object.
      if (obj.issuccess && obj.messagesuccessfulorfailed === 'SUCCESSFUL') {
        //Saving customer info to store
        dispatch({ type: 'setCustomerInfo', customerInfo: obj })
        //Take me to the dashboard on login
        navigate('/')
        return
      }
      //If login fails
      setErrorMSG({
        state: obj.messagesuccessfulorfailed,
        message: obj.message,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  /*  */

  const onSubmit = (data) => {
    login(data)
    //Reset loader
    reset()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm noValidate onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>

                    {errorMSG.message ? <CAlert color="danger">{errorMSG.message}</CAlert> : null}

                    <CFormSelect
                      aria-label="Default select example"
                      options={countryOption}
                      className="mb-3"
                      {...register('country', { required: true, minLength: 2, maxLength: 50 })}
                    />

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        {...register('username', { required: true, minLength: 2, maxLength: 50 })}
                        required
                        feedbackInvalid="Please provide a valid username."
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register('password', { required: true, minLength: 2, maxLength: 50 })}
                        required
                        feedbackInvalid="Please provide a valid password."
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          type="submit"
                          className="px-4"
                          active
                          disabled={isSubmitting}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
