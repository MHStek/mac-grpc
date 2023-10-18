// export default Login
import React from 'react'
import { Link } from 'react-router-dom'
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilGlobeAlt, cilLockLocked, cilUser } from '@coreui/icons'
import { useForm } from 'react-hook-form'
import useCountries from 'src/hooks/useCountries'
import useLogin from 'src/hooks/useLogin'
import getFlagUrl from 'src/utils/getFlagUrl'

const url = 'https://egamaingrpcapiforeganowappsv1.azurewebsites.net/'
/* 

*/
const Login = () => {
  const [countryOption] = useCountries(url)
  const [errorMSG, setLogin] = useLogin(url)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm()
  //Watch country value for changes
  const watchCountry = watch('country')

  function onSubmit(data) {
    // return promise that resolves after 2 seconds
    return new Promise((resolve) => {
      setLogin(data)
    })
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
                    {errorMSG.message && <CAlert color="danger">{errorMSG.message}</CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        {getFlagUrl(watchCountry, countryOption) ? (
                          <img
                            alt="country flag"
                            src={getFlagUrl(watchCountry, countryOption)}
                            style={{
                              width: '16px',
                              height: 'auto',
                            }}
                          />
                        ) : (
                          <CIcon icon={cilGlobeAlt} />
                        )}
                      </CInputGroupText>
                      <CFormSelect
                        aria-label="Default select example"
                        options={countryOption}
                        {...register('country', { required: true, minLength: 2, maxLength: 50 })}
                      />
                    </CInputGroup>

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
                          Login{' '}
                          {isSubmitting && <CSpinner variant="grow" size="sm" aria-hidden="true" />}
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
              <CCard className="text-white bg-primary py-5">
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
