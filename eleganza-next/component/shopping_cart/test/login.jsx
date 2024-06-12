import React, { useState } from 'react'
import axios from 'axios'
import useAuth from '@/hooks/useAuth' // 使用身份验证钩子
import eleganza from '../test/log.module.css' // 这个模块未见到使用

const Login = () => {
  const { toggleAuth } = useAuth() // 获取切换身份验证状态的函数
  const [user_account, setUserAccount] = useState('')
  const [user_password, setUserPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3005/api/auth/login',
        {
          user_account,
          user_password,
        },
      )

      if (response.data.status === 'success') {
        toggleAuth() // 切换身份验证状态
        setLoginError('')
        // 使用 window.location 跳转
        window.location.href = 'http://localhost:3000/shopping_cart'
      } else {
        setLoginError(response.data.message || '登录失败') // 设置错误信息
      }
    } catch (error) {
      console.error('Login error:', error) // 输出错误日志
      setLoginError('网络错误，请稍后再试') // 设置网络错误信息
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="用户名"
        value={user_account}
        onChange={(e) => setUserAccount(e.target.value)}
      />
      <input
        type="password"
        placeholder="密码"
        value={user_password}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <button onClick={handleLogin}>登录</button>
      {loginError && <p>{loginError}</p>} // 显示错误信息
    </div>
  )
}

export default Login
