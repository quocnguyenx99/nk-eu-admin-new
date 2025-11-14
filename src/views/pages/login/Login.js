import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CRow,
  CSpinner,
} from '@coreui/react'
import Logo from '../../../assets/images/logo/logo NK.png'
import { axiosClient } from '../../../axiosConfig'
import { toast } from 'react-toastify'
import loginBackground from '../../../assets/images/background/loginBackground.jpg'

import ReCAPTCHA from 'react-google-recaptcha'

const Login = () => {
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  // const [key, setKey] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showSecureKey, setShowSecureKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState(null)

  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warn('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    try {
      setLoading(true)
      const res = await axiosClient.post('/admin-login', {
        username,
        password,
        // passwordSecurity: key,
        captchaToken: recaptchaToken,
      })
      if (res.data.status === true) {
        localStorage.setItem('adminNKEU', res.data.token)
        localStorage.setItem('username', res.data.username)
        navigate('/')
      } else {
        if (res.data.mess === 'username') toast.error('Sai tên đăng nhập!')
        else if (res.data.mess === 'pass') toast.error('Sai mật khẩu!')
        else if (res.data.mess === 'wrong passwordSecurity') toast.error('Sai khóa bảo mật!')
        else toast.error('Đăng nhập thất bại!')
      }
    } catch (e) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center position-relative"
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay để làm tối background */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      ></div>

      <CContainer style={{ zIndex: 2, position: 'relative' }}>
        <CRow className="justify-content-center">
          <CCol md={5} lg={4}>
            <CCard
              className="shadow-lg border-0"
              style={{
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <CCardBody className="p-4">
                <div className="text-center mb-4">
                  <CImage src={Logo} width={120} alt="Logo" className="mb-3" />
                </div>

                <CForm onKeyDown={handleKeyDown} autoComplete="off">
                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Tài khoản</label>
                    <CFormInput
                      placeholder="Nhập tài khoản"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      autoFocus
                      style={{
                        borderRadius: '0px',
                        padding: '12px 16px',
                        fontSize: '16px',
                        height: '48px',
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-dark">Mật khẩu</label>
                    <div className="position-relative">
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassWord(e.target.value)}
                        style={{
                          borderRadius: '0px',
                          padding: '12px 16px',
                          fontSize: '16px',
                          height: '48px',
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                        onClick={() => setShowPassword((s) => !s)}
                        tabIndex={-1}
                        style={{ textDecoration: 'none', color: '#6c757d' }}
                      >
                        {showPassword ? 'Ẩn' : 'Hiện'}
                      </button>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <label className="form-label small fw-semibold text-dark">Khóa bảo mật</label>
                    <div className="position-relative">
                      <CFormInput
                        type={showSecureKey ? 'text' : 'password'}
                        placeholder="Nhập khóa bảo mật"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        style={{
                          borderRadius: '0px',
                          padding: '12px 16px',
                          fontSize: '16px',
                          height: '48px',
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-sm btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
                        onClick={() => setShowSecureKey((s) => !s)}
                        tabIndex={-1}
                        style={{ textDecoration: 'none', color: '#6c757d' }}
                      >
                        {showSecureKey ? 'Ẩn' : 'Hiện'}
                      </button>
                    </div>
                  </div> */}

                  <div className="mb-3 text-center">
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                      onChange={setRecaptchaToken}
                    />
                  </div>

                  <CButton
                    color="primary"
                    className="w-100 py-2"
                    disabled={loading}
                    onClick={handleLogin}
                    style={{
                      borderRadius: '0px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      height: '48px',
                      fontSize: '16px',
                    }}
                  >
                    {loading ? (
                      <>
                        <CSpinner size="sm" className="me-2" /> Đang đăng nhập...
                      </>
                    ) : (
                      'Đăng nhập'
                    )}
                  </CButton>
                </CForm>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    © {new Date().getFullYear()} Nguyen Kim EU Admin Portal
                  </small>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
