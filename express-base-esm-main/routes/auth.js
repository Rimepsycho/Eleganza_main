import express from 'express'
const router = express.Router()
import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config.js'
import { QueryTypes } from 'sequelize'
import sequelize from '#configs/db.js'
const { User } = sequelize.models

// 定义访问令牌的密钥
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 登录处理程序
router.post('/login', async (req, res) => {
  const loginUser = req.body

  // 验证用户名和密码字段是否存在
  if (!loginUser.user_account || !loginUser.user_password) {
    return res
      .status(400)
      .json({ status: 'fail', message: '用户名和密码是必须的' })
  }

  // 根据用户名查询数据库
  const user = await User.findOne({
    where: { user_account: loginUser.user_account },
    raw: true,
  })

  // 检查用户名是否存在
  if (!user) {
    return res
      .status(401)
      .json({ status: 'error', message: '用户名或密码错误' })
  }

  // 如果密码是明文，直接比较字符串
  const isValid = loginUser.user_password === user.user_password

  if (!isValid) {
    return res
      .status(401)
      .json({ status: 'error', message: '用户名或密码错误' })
  }

  // 生成JWT
  const returnUser = {
    user_id: user.user_id,
    user_account: user.user_account,
  }

  const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
    expiresIn: '3d',
  })

  res.cookie('accessToken', accessToken, { httpOnly: true })
  return res.json({
    status: 'success',
    data: { accessToken },
  })
})

export default router
