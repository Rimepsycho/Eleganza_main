import { useState, useEffect } from 'react'
import React from 'react'
import styles from './login.module.scss'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import RegisterForm from '@/component/users/form/register'

export default function LoginForm() {
  const { auth } = useAuth()
  const { login } = useAuth()

  const [user, setUser] = useState({
    useremail: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const togglePasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword((prevState) => !prevState)
  }

  const [errors, setErrors] = useState({
    useremail: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {
      useremail: '',
      password: '',
    }

    if (!user.useremail) {
      newErrors.useremail = '*帳號為必填'
    }

    if (!user.password) {
      newErrors.password = '*密碼為必填'
    }

    setErrors(newErrors)

    if (user.useremail && user.password) {
      try {
        // await loginUser(user.useremail, user.password);
        await login(user.useremail, user.password)
      } catch (error) {
        console.error('Error occurred during login:', error)
        alert('登入時發生錯誤')
      }
    }
  }

  const [showOffcanvas, setShowOffcanvas] = useState(false)

  const handleToggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas)
  }

  return (
    <>
      <div className={styles.formwrap}>
        <div className={styles.logo}>
          <a href="">ELEGANZA</a>
        </div>
        <form className={styles.formwraps} onSubmit={handleSubmit}>
          <div className={styles.form}>
            <label className={styles.formkey}>Email</label>
            <input
              className={styles.formvalue}
              type="text"
              name="useremail"
              onChange={handleFieldChange}
            />
            <span className={styles.error}>{errors.useremail}</span>
          </div>
          <div className={styles.form}>
            <div className={styles.passwordinput}>
              <label className={styles.formkey}>密碼</label>
              <a href="#" onClick={togglePasswordVisibility}>
                <img
                  src="/icons/icon-eye.svg"
                  alt="Toggle Password Visibility"
                />
              </a>
            </div>
            <input
              className={styles.formvalue}
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={handleFieldChange}
            />
            <span className={styles.error}>{errors.password}</span>
          </div>
          <div className={styles.formcheck}>
            <div className={styles.checkloginstatus}>
              <input type="checkbox" />
              <p>保持登入狀態</p>
            </div>
            <a href="">忘記密碼？</a>
          </div>
          <div className={styles.mbtn} onClick={handleSubmit}>
            <button type="submit">登入</button>
          </div>
        </form>
        <div className={styles.registeraccount}>
          <button type="button" onClick={handleToggleOffcanvas}>
            註冊帳號
          </button>
        </div>
        <div
          className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`}
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => setShowOffcanvas(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            {/* 這裡放入註冊表單元件 */}
            <RegisterForm />
          </div>
        </div>
      </div>
    </>
  )
}
