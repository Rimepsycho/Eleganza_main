import { useState } from 'react'
import styles from './register.module.scss'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useRouter } from 'next/router'
import LoginForm from '@/component/users/form/login'

export default function RegisterForm() {
  const router = useRouter()

  const [user, setUser] = useState({
    useremail: '',
    password: '',
    phone: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    useremail: '',
    password: '',
    phone: '',
    confirmPassword: '',
  })
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      useremail: user.useremail,
      phone: user.phone,
      password: user.password,
      confirmPassword: user.confirmPassword,
    }
    const newErrors = {
      useremail: '',
      password: '',
      phone: '',
      confirmPassword: '',
    }

    let hasErrors = false

    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (!user.useremail) {
      newErrors.useremail = '*帳號為必填'
      hasErrors = true
    } else if (!emailRegex.test(user.useremail)) {
      newErrors.useremail = '請輸入正確的電郵格式'
      hasErrors = true
    }

    // 手機號碼格式檢查
    const phoneRegex = /^09\d{8}$/
    if (!user.phone) {
      newErrors.phone = '*手機號碼為必填'
      hasErrors = true
    } else if (!phoneRegex.test(user.phone)) {
      newErrors.phone = '手機號碼必須是以 09 開頭的 10 位阿拉伯數字'
      hasErrors = true
    }

    if (user.password !== user.confirmPassword) {
      newErrors.password = '密碼與確認密碼需要一致'
      newErrors.confirmPassword = '密碼與確認密碼需要一致'
      hasErrors = true
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{6,}$/
    if (!user.password) {
      newErrors.password = '*密碼為必填'
      hasErrors = true
    } else if (!passwordRegex.test(user.password)) {
      newErrors.password =
        '密碼必須至少6個字符，必須包含數字、羅馬字母大小寫，並可加入特殊符號'
      hasErrors = true
    }

    if (!user.confirmPassword) {
      newErrors.confirmPassword = '*確認密碼為必填'
      hasErrors = true
    }

    setErrors(newErrors)

    if (hasErrors) {
      return
    }

    try {
      const res = await fetch(
        'http://localhost:3005/api/home-myaccount/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        },
      )
      const data = await res.json()
      console.log(data)

      if (res.ok) {
        setShowLoginForm(true)
        alert('註冊成功，請以新帳號密碼重新登入使用。')
      } else {
        alert('帳號註冊失敗，請再試一次。')
      }
    } catch (error) {
      console.error('Error occurred during registration:', error)
      alert('註冊時發生錯誤')
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = (e) => {
    e.preventDefault()
    setShowPassword((prevState) => !prevState)
  }

  const [showPassword2, setShowPassword2] = useState(false)
  const togglePasswordVisibility2 = (e) => {
    e.preventDefault()
    setShowPassword2((prevState) => !prevState)
  }

  const handleLoginButtonClick = () => {
    // 切換為顯示登入表單的模式
    setShowLoginForm(true)
  }

  return (
    <>
      <div className={styles.formwrap}>
        <div className={styles.logo}>
          <a href="">ELEGANZA</a>
        </div>
        <form className={styles.formwraps} onSubmit={handleSubmit}>
          <div className={styles.form}>
            <p className={styles.formkey}>Email</p>
            <input
              className={styles.formvalue}
              type="text"
              name="useremail"
              value={user.useremail}
              onChange={handleFieldChange}
            />
            <span className={styles.error}>{errors.useremail}</span>
          </div>
          <div className={styles.form}>
            <p className={styles.formkey}>手機號碼</p>
            <input
              className={styles.formvalue}
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleFieldChange}
            />
            <span className={styles.error}>{errors.phone}</span>
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
              value={user.password}
              onChange={handleFieldChange}
            />
            <span className={styles.error}>{errors.password}</span>
            <PasswordStrengthBar password={user.password} />
          </div>
          <div className={styles.form}>
            <div className={styles.passwordinput}>
              <label className={styles.formkey}>重新輸入密碼</label>
              <a href="#" onClick={togglePasswordVisibility2}>
                <img
                  src="/icons/icon-eye.svg"
                  alt="Toggle Password Visibility"
                />
              </a>
            </div>
            <input
              className={styles.formvalue}
              type={showPassword2 ? 'text' : 'password'}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleFieldChange}
            />
            <span className={styles.error}>{errors.confirmPassword}</span>
          </div>
          <div className={styles.formcheck}>
            <div className={styles.checkloginstatus}>
              <input type="checkbox" />
              <p>保持登入狀態</p>
            </div>
            <a href="">忘記密碼？</a>
          </div>
          <div className={styles.mbtn} onClick={handleSubmit}>
            <button type="submit">註冊</button>
          </div>
        </form>
        {showLoginForm && (
          <div
            className={`offcanvas offcanvas-end show`}
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
                onClick={() => setShowLoginForm(false)}
              ></button>
            </div>
            <div className="offcanvas-body">
              <LoginForm />
            </div>
          </div>
        )}
        <div className={styles.registeraccount}>
          <p>已有帳號了嗎？</p>
          {/* 點擊這個按鈕後切換為顯示登入表單的模式 */}
          <button type="button" onClick={handleLoginButtonClick}>
            由此登入
          </button>
        </div>
      </div>
    </>
  )
}
