import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'
import bodyParser from 'body-parser'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'
import { getIdParam } from '#db-helpers/db-tool.js'
import authenticate from '#middlewares/authenticate.js'
import cors from 'cors'

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

import multer from 'multer'

const upload = multer()
// const whiteList = ["http://localhost:3000/", "http://127.0.0.1:3000/"];
// const corsOptions = {
//   credentials: true,
//   origin(origin, callback){
//     if(!origin || whiteList.includes(origin)){
//       callback(null, true);
//     }else{
//       callback(new Error("不允許傳遞資料"))
//     }
//   }
// };
// router.use(cors(corsOptions));
// router.use(express.urlencoded({ extended: true }));
// router.use(express.json());

router.get('/', async (req, res) => {
  try {
    // 從資料庫中獲取所有使用者的資訊
    const [users] = await db.query('SELECT * FROM `users`')
    res.json({ users })
  } catch (error) {
    console.error('獲取使用者時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { user_email, user_password } = req.body
    console.log(user_email, user_password)
    // 在資料庫中查詢使用者記錄
    const [userRows] = await db.query(
      'SELECT * FROM `users` WHERE `user_email`=? AND `user_password`=?',
      [user_email, user_password]
    )
    const user = userRows[0]

    if (!user) {
      // 如果使用者不存在，返回錯誤訊息
      return res
        .status(400)
        .json({ status: 'error', message: '帳號或密碼錯誤' })
    }

    // 存取令牌中的資訊，只需要id和username就足夠，需要其它資料再向資料庫查詢
    const returnUser = {
      id: user.user_id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_account: user.user_account,
      user_phone: user.user_phone,
      user_password: user.user_password,
    }

    // 產生存取令牌(access token)
    const accessToken = jwt.sign(returnUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '3d',
    })
    console.log(accessToken)

    // 在瀏覽器端使用httpOnly cookie儲存accessToken
    res.cookie('accessToken', accessToken, { httpOnly: true })

    // 回應accessToken和用戶ID到前端
    return res.json({
      status: 'success',
      data: { userId: user.user_id, accessToken },
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ status: 'error', message: '伺服器錯誤' })
  }
})

// 登出
router.post('/logout', checkAccessToken, async (req, res, next) => {
  try {
    const userId = req.user.id

    const [userRows] = await db.query(
      'SELECT * FROM `users` WHERE `user_id` = ?',
      [userId]
    )
    const user = userRows[0]

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const returnUser = {
      id: undefined,
      useremail: undefined,
    }

    res.clearCookie('accessToken', { httpOnly: true })
    return res.json({ status: 'success', data: null })
  } catch (error) {
    console.error('Error during logout:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  }
})

// 檢查登入狀態，回應會員資料
router.get('/check', checkAccessToken, async function (req, res, next) {
  try {
    // 如果會員是在存取令牌合法的情況下，req.user中會有會員的id和username
    // 使用username查詢資料表，把資料表中加密過密碼字串提取出來
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [
      req.user.id,
    ])
    const user = rows[0]

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: '找不到用戶',
      })
    }

    // 不回傳密碼
    delete user.user_password

    // 回傳用戶資料及新的存取令牌
    const returnUser = {
      user_id: user.user_id,
      user_email: user.user_email,
    }

    // 產生存取令牌(access token)
    const accessToken = jwt.sign(returnUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '3d',
    })

    res.status(200).json({
      status: 'success',
      data: { user, accessToken },
    })
  } catch (error) {
    console.error('Error during checking login status:', error)
    res.status(500).json({
      status: 'error',
      message: '檢查狀態失敗，請重新登入',
    })
  }
})

router.post('/register', async (req, res, next) => {
  const newUser = req.body
  console.log(req.body)

  // 檢查是否有必要的數據
  if (
    !newUser.useremail ||
    !newUser.phone ||
    !newUser.password ||
    !newUser.confirmPassword
  ) {
    return res.status(400).json({ status: 'error', message: '缺少必要數據' })
  }

  if (newUser.password !== newUser.confirmPassword) {
    return res
      .status(400)
      .json({ status: 'error', message: '密碼和確認密碼不匹配' })
  }

  try {
    // 檢查數據表中是否已存在相同的 email
    const [existingUsers] = await db.query(
      'SELECT * FROM `users` WHERE `user_email` = ?',
      [newUser.email]
    )
    console.log(existingUsers)
    if (existingUsers.length > 0) {
      return res.status(400).json({ status: 'error', message: '此帳號已存在' })
    }

    // 如果數據表中不存在相同的 email，則創建新的使用者帳號
    const [createdUser] = await db.query(
      'INSERT INTO `users` (`user_email`, `user_phone`, `user_password`) VALUES (?, ?, ?)',
      [newUser.useremail, newUser.phone, newUser.password]
    )
    console.log(createdUser)

    if (!createdUser.insertId) {
      // 若無法獲取新使用者的 insertId，則表示創建使用者失敗
      throw new Error('Failed to create user')
    }

    // 返回成功的響應
    return res
      .status(201)
      .json({ status: 'success', data: null, message: '使用者帳號創建成功' })
  } catch (error) {
    console.error('Error creating user:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '伺服器錯誤，無法創建使用者帳號' })
  }
})

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    // 從資料庫中獲取特定使用者的資訊
    const [rows] = await db.query('SELECT * FROM `users` WHERE `user_id`=?', [
      userId,
    ])
    const userDetails = rows[0]

    res.json({ userDetails })
  } catch (error) {
    console.error('獲取使用者詳細資訊時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.put('/:id', checkAccessToken, async function (req, res) {
  const id = getIdParam(req)

  // user 為來自前端的會員資料(準備要修改的資料)
  const updatedUserData = req.body

  try {
    // 查詢資料庫目前的資料
    const [rows] = await db.query('SELECT * FROM `users` WHERE `user_id`=?', [
      id,
    ])
    const dbUser = rows[0]

    if (!dbUser) {
      return res.status(404).json({ status: 'error', message: '使用者不存在' })
    }

    console.log(req.user, id)

    // 檢查是否有存取權限
    if (req.user.id !== id) {
      return res
        .status(401)
        .json({ status: 'error', message: '存取會員資料失敗' })
    }

    // 更新資料庫的資料
    const updateQuery = `
      UPDATE users 
      SET user_name=?, user_account=?, user_password=?, user_phone=?
      WHERE user_id=?
    `
    await db.query(updateQuery, [
      updatedUserData.user_name,
      updatedUserData.user_account,
      updatedUserData.user_password,
      updatedUserData.user_phone,
      id,
    ])

    // 更新成功後，重新查詢更新後的會員資料
    const [updatedRows] = await db.query(
      'SELECT * FROM `users` WHERE `user_id`=?',
      [id]
    )
    const updatedUser = updatedRows[0]

    if (updatedUser) {
      const returnUser = {
        user_name: updatedUser.user_name,
        user_account: updatedUser.user_account,
        user_phone: updatedUser.user_phone,
      }

      // 生成新的 accessToken
      const accessToken = jwt.sign(
        returnUser,
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '3d',
        }
      )

      // 不需要回傳密碼給前端
      delete updatedUser.user_password

      return res.status(200).json({
        status: 'success',
        data: { updatedUser },
        accessToken, // 將新的 accessToken 返回給客戶端
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: '修改資料失敗，請稍候再嘗試',
      })
    }
  } catch (error) {
    console.error('Error updating user details:', error)
    res.status(500).json({
      status: 'error',
      message: '伺服器錯誤，請稍後再試',
    })
  }
})

function checkAccessToken(req, res, next) {
  // 从请求头或 cookie 中获取访问令牌
  const accessToken = req.headers.authorization || req.cookies.accessToken

  console.log(accessToken)

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' })
  }

  const token = accessToken.split(' ')[1]

  // 验证访问令牌
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' })
    }
    // 将解码后的用户信息附加到请求对象中，以便后续处理函数使用
    req.user = decoded
    next()
  })
}
export default router
