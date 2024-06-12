import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const [auth, setAuth] = useState({
    isAuth: false,
    userData: null,
    token: null,
    isLoggedIn: false,
    userId: null,
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    let userData = null

    // 檢查是否有存儲的用戶數據
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      userData = JSON.parse(storedUserData)
      console.log(storedUserData)
    }

    if (token) {
      const parsedData = parseJwt(token)
      setAuth({
        token: token,
        isLoggedIn: true,
        userData: parsedData,
        isAuth: true,
        userId: parsedData.id,
      })
    }
  }, [])

  const [user, setUser] = useState({
    useremail: '',
    password: '',
    phone: '',
    name: '',
    account: '',
    newPassword: '',
    newPasswordConfirm: '',
  })

  const login = async (email, password) => {
    try {
      // 发送身份验证请求
      const response = await fetch(
        'http://localhost:3005/api/home-myaccount/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: email,
            user_password: password,
          }),
        },
      )

      const data = await response.json()
      console.log(data)

      if (data.status === 'success') {
        // 将 accessToken 存储到 localStorage
        localStorage.setItem('accessToken', data.data.accessToken)
        localStorage.setItem('userId', data.data.userId)

        // 更新用户认证状态和数据
        const parsedData = parseJwt(data.data.accessToken)
        setAuth({
          token: data.data.accessToken,
          isLoggedIn: true,
          userData: parsedData,
          isAuth: true,
          userId: parsedData.id,
        })

        console.log(parsedData)

        router.push('/users/account-center/account-center')
        alert('登入成功')
      } else {
        // 处理登录失败的情况
        console.error('Login failed')
        alert('登入失敗，請檢查帳號和密碼')
      }
    } catch (error) {
      // 处理错误
      console.error('Error occurred during login:', error)
      alert('登录时发生错误')
    }
  }

  const logout = async () => {
    const res = await fetch('http://localhost:3005/api/home-myaccount/logout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`, // 添加授權標頭
      },
      body: JSON.stringify({}),
    })

    const data = await res.json()

    if (data.status === 'success') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userId')
      setAuth({
        token: null,
        isLoggedIn: false,
        userData: null,
        isAuth: false,
        userId: null,
      })
      router.push(`/`)
      alert('登出成功')
    } else {
      alert(data.message)
    }
  }

  const updateUserData = async (updatedData) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      if (!accessToken) throw new Error('Access token not found')

      const response = await fetch(
        `http://localhost:3005/api/home-myaccount/${auth.userData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedData),
        },
      )

      if (!response.ok) throw new Error('Failed to update user data')

      const data = await response.json()
      console.log('User data updated successfully:', data)
      alert('修改成功。')
    } catch (error) {
      console.error('Error updating user data:', error)
      // 在這裡處理錯誤，例如顯示一個錯誤提示給用戶
    }
  }

  const handleCheck = async () => {
    const res = await fetch('http://localhost:3005/api/home-myaccount/check', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (data.status === 'success') {
      console.log(data.data)
    } else {
      alert(data.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{ auth, login, logout, updateUserData, handleCheck }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
