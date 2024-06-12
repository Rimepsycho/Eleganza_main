import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from './account-center.module.css'
import UserLayout from '@/component/users/user-layout'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function AccountCenter() {
  const [userDetails, setUserDetails] = useState(null) // 初始化為 null，因為在開始時還沒有使用者詳細資訊

  const { auth, updateUserData } = useAuth()

  const fetchUserDetails = async (userId) => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return

    try {
      const response = await fetch(
        `http://localhost:3005/api/home-myaccount/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      if (!response.ok) throw new Error('Failed to fetch user details')
      const data = await response.json()
      setUserDetails(data.userDetails)
    } catch (error) {
      console.error('Error fetching user details:', error)
      // 在這裡處理錯誤，例如顯示一個錯誤提示給用戶
    }
  }

  const [errors, setErrors] = useState({
    user_useremail: '',
    user_password: '',
    user_phone: '',
    user_name: '',
    user_account: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  useEffect(() => {
    const userId = auth?.userData?.id // 或者任何你想要的使用者ID
    if (userId) {
      fetchUserDetails(userId)
    }
  }, [auth])

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setUserDetails((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = {
      user_password: '',
      newPassword: '',
      newPasswordConfirm: '',
    }
    let hasErrors = false

    if (userDetails.user_password == userDetails.newPassword) {
      newErrors.user_password = '新密碼不可與舊密碼一樣'
      newErrors.newPassword = '新密碼不可與舊密碼一樣'
      hasErrors = true
    }

    if (userDetails.newPassword !== userDetails.newPasswordConfirm) {
      newErrors.newPassword = '新密碼與確認密碼需要一致'
      newErrors.newPasswordConfirm = '新密碼與確認密碼需要一致'
      hasErrors = true
    }

    if (userDetails.newPassword && !userDetails.newPasswordConfirm) {
      newErrors.newPasswordConfirm = '*確認密碼為必填'
      hasErrors = true
    }

    if (userDetails.newPassword) {
      // 只有當 newPassowrd 欄位有更動時才進行密碼格式驗證
      const newPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{6,}$/
      if (!newPasswordRegex.test(userDetails.newPassword)) {
        newErrors.newPassword =
          '新密碼必須至少6個字符，必須包含數字、羅馬字母大小寫，並可加入特殊符號'
        hasErrors = true
      }
    }

    // 手機號碼格式檢查
    const phoneRegex = /^09\d{8}$/
    if (!phoneRegex.test(userDetails.user_phone)) {
      newErrors.user_phone = '手機號碼必須是以 09 開頭的 10 位阿拉伯數字'
      hasErrors = true
    }

    setErrors(newErrors)

    if (hasErrors) {
      return
    }

    // 更新用戶資料
    const updatedUserData = {
      user_name: userDetails.user_name,
      user_account: userDetails.user_account,
      user_phone: userDetails.user_phone,
      user_password: userDetails.newPassword
        ? userDetails.newPassword
        : userDetails.user_password, // 可以根據需要修改成 user.new_Password
    }

    if (userDetails.newPassword) {
      updatedUserData.user_password = userDetails.newPassword
    }

    updateUserData(updatedUserData)
  }

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['mainarea-desktop']}>
          <div>
            <form onSubmit={handleSubmit}>
              <p className={styles['maintitle']}>帳號細節</p>
              <div className={styles['formdetail']}>
                <div className={styles['formkey']}>
                  <p>帳號名稱</p>
                  <p>手機號碼</p>
                </div>
                <div className={styles['formvalue']}>
                  <p>{userDetails?.user_email}</p>
                  <p>{userDetails?.user_phone}</p>
                </div>
              </div>
              <div>
                <p className={styles['maintitle']}>個人檔案</p>
                <div className={styles['formdetail']}>
                  <div className={styles['formkey']}>
                    <p>姓名</p>
                    <p>手機號碼</p>
                    <p>顯示名稱</p>
                  </div>
                  <div className={styles['formvalue']}>
                    <input
                      className={styles['formstyle']}
                      type="text"
                      // placeholder={user?.user_name}
                      name="user_name"
                      value={userDetails?.user_name}
                      onChange={handleFieldChange}
                    />
                    <input
                      className={styles['formstyle']}
                      type="text"
                      // placeholder={userDetails?.user_phone}
                      name="user_phone"
                      value={userDetails?.user_phone || ''}
                      // value={userDetails?.user_phone}
                      onChange={handleFieldChange}
                      required
                    />
                    <span className={styles.error}>{errors.user_phone}</span>
                    <input
                      className={styles['formstyle']}
                      type="text"
                      // placeholder={userDetails?.user_account}
                      name="user_account"
                      value={userDetails?.user_account}
                      onChange={handleFieldChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className={styles['maintitle']}>變更密碼</p>
                <div className={styles['formdetail']}>
                  <div className={styles['formkey']}>
                    <p>舊密碼</p>
                    <p>新密碼</p>
                    <p>密碼確認</p>
                  </div>
                  <div className={styles['formvalue']}>
                    <input
                      className={styles['formstyle']}
                      type="password"
                      placeholder="舊密碼"
                      name="user_password"
                      value={userDetails?.user_password}
                      onChange={handleFieldChange}
                    />
                    <span className={styles.error}>{errors.user_password}</span>
                    <input
                      className={styles['formstyle']}
                      type="password"
                      placeholder="不可與舊密碼相同"
                      name="newPassword"
                      value={userDetails?.newPassword}
                      onChange={handleFieldChange}
                    />
                    <span className={styles.error}>{errors.newPassword}</span>
                    <input
                      className={styles['formstyle']}
                      type="password"
                      placeholder="確認新密碼"
                      name="newPasswordConfirm"
                      value={userDetails?.newPasswordConfirm}
                      onChange={handleFieldChange}
                    />
                    <span className={styles.error}>
                      {errors.newPasswordConfirm}
                    </span>
                    <div className={styles['xsbtn']}>
                      <button type="submit">儲存</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={styles['mainarea-mobile']}>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: 20,
                width: '100%',
                borderBottom: '0.5px solid var(--color-primary-medium)',
              }}
            >
              <p>{userDetails?.user_account}</p>
            </div>
            <p className={styles['maintitle']}>帳號細節</p>
            <div className={styles['formdetail']}>
              <div className={styles['formkey']}>
                <p>帳號名稱</p>
                <p>手機號碼</p>
              </div>
              <div className={styles['formvalue']}>
                <p>{userDetails?.user_email}</p>
                <p>{userDetails?.user_phone}</p>
              </div>
            </div>
            <p className={styles['maintitle']}>個人檔案</p>
            <div className={styles['formdetail']}>
              <div className={styles['formkey']}>
                <p>姓名</p>
                <p>手機號碼</p>
                <p>顯示名稱</p>
              </div>
              <div className={styles['formvalue']}>
                <input
                  className={styles['formstyle']}
                  type="text"
                  // placeholder={userDetails?.user_name}
                  name="user_name"
                  value={userDetails?.user_name}
                  onChange={handleFieldChange}
                />
                <input
                  className={styles['formstyle']}
                  type="text"
                  // placeholder={userDetails?.user_phone}
                  name="user_phone"
                  value={userDetails?.user_phone}
                  onChange={handleFieldChange}
                />
                <span className={styles.error}>{errors.user_phone}</span>
                <input
                  className={styles['formstyle']}
                  type="text"
                  // placeholder={userDetails?.user_account}
                  name="user_account"
                  value={userDetails?.user_account}
                  onChange={handleFieldChange}
                />
              </div>
            </div>
            <p className={styles['maintitle']}>變更密碼</p>
            <div className={styles['formdetail']}>
              <div className={styles['formkey']}>
                <p>舊密碼</p>
                <p>新密碼</p>
                <p>密碼確認</p>
              </div>
              <div className={styles['formvalue']}>
                <input
                  className={styles['formstyle']}
                  type="password"
                  placeholder="舊密碼"
                  name="user_password"
                  value={userDetails?.user_password}
                  onChange={handleFieldChange}
                />
                <span className={styles.error}>{errors.user_password}</span>
                <input
                  className={styles['formstyle']}
                  type="password"
                  placeholder="新密碼"
                  name="newPassword"
                  value={userDetails?.newPassword}
                  onChange={handleFieldChange}
                />
                <span className={styles.error}>{errors.newPassword}</span>
                <input
                  className={styles['formstyle']}
                  type="password"
                  placeholder="確認密碼"
                  name="newPasswordConfirm"
                  value={userDetails?.newPasswordConfirm}
                  onChange={handleFieldChange}
                />
                <span className={styles.error}>
                  {errors.newPasswordConfirm}
                </span>
              </div>
            </div>
            <div className={styles['xsbtn']}>
              <button type="submit">儲存</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

AccountCenter.getLayout = function (page) {
  return <UserLayout currentPage="我的帳號">{page}</UserLayout>
}
