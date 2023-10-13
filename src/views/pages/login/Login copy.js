import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useForm, SubmitHandler } from 'react-hook-form'

import useCountries from 'src/hooks/useCountries'

import customerGRPCWeb from 'src/layout/protos-gen/Customer_grpc_web_pb'
import { Customer } from 'src/layout/protos-gen/Customer_pb'

import { CommonDataSvcClient } from 'src/layout/protos-gen/CommonData_grpc_web_pb'
import { EmptyCommonDataMessage } from 'src/layout/protos-gen/CommonData_pb'

const Login = () => {
  const client = new CommonDataSvcClient(
    'https://egamaingrpcapiforeganowappsv1.azurewebsites.net/',
    null,
    null,
  )
  const [countryOption, setCountryOption] = useState([])
  /*  */
  // say hello unary call
  const getCountries = () => {
    const request = new EmptyCommonDataMessage()

    client.getReceivingOperatingCountries(request, null, (err, response) => {
      if (err) {
        console.log(err.message)
        return
      }

      const countryArray = []
      //Construct the country object
      for (const country of response.getCountrylistList()) {
        countryArray.push({
          label: country.array[1],
          value: country.array[0],
          flag: country.array[3],
        })
      }
      //Setting countries to state
      setCountryOption(countryArray)
    })
  }

  useEffect(() => {
    getCountries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  /*  */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
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

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        {...register('username', { required: true, minLength: 2, maxLength: 50 })}
                        required
                        type="text"
                        feedbackInvalid="Please provide a valid username."
                        id="username"
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
                      />
                    </CInputGroup>

                    <CFormSelect
                      aria-label="Default select example"
                      value={1}
                      options={countryOption}
                      className="mb-4"
                      onChange={() => {}}
                    />

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="px-4" active>
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
