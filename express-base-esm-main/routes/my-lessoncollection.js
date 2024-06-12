import express from 'express'
const router = express.Router()
import db from '##/configs/mysql.js'
import 'dotenv/config.js'

router.get('/', async (req, res) => {
  let sql = `
  SELECT course.*, teacher.t_name AS course_teacher_name FROM course		
  JOIN teacher ON course.teacher_id = teacher.teacher_id 
  ORDER BY course.course_id
  `
  const [lessons] = await db.query(sql)

  res.json({ lessons })
})

router.get('/:lessonId', async (req, res) => {
  try {
    const lessonId = req.params.lessonId
    // 從資料庫中取得使用者資料
    let sql2 = `
    SELECT course.*, teacher.t_name AS course_teacher_name FROM course		
    JOIN teacher ON course.teacher_id = teacher.teacher_id 
    WHERE course_id=?
    ORDER BY course_id
    `
    const [rows] = await db.query(sql2, [lessonId])
    console.log(rows)

    // 回傳資料給前端
    res.json({ lessonDetails: rows[0] })
  } catch (error) {
    console.error('Error fetching user details:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/lessoncollection/:userId', async (req, res) => {
  const userId = req.params.userId

  let sql = `
    SELECT 
      course.*, 
      teacher.t_name AS course_teacher_name,
      users.user_id AS user_id
    FROM 
      course_likes
    JOIN 
      course ON course_likes.course_id = course.course_id 
    JOIN 
      teacher ON course.teacher_id = teacher.teacher_id
    JOIN
      users ON course_likes.user_id = users.user_id 
    WHERE 
      course_likes.user_id = ?
    ORDER BY 
      course_likes.course_like_id;
  `

  try {
    // 從 course_likes 資料表中獲取特定使用者的課程收藏數據
    const [collections] = await db.query(sql, [userId])
    res.json({ collections })
  } catch (error) {
    console.error('獲取使用者課程收藏時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

router.get('/productcollection/:userId', async (req, res) => {
  const userId = req.params.userId

  let sql = `
    SELECT 
      product.*, 
      users.user_id AS user_id
    FROM 
      product_likes
    JOIN 
      product ON product_likes.product_id = product.product_id 
    JOIN
      users ON product_likes.user_id = users.user_id 
    WHERE 
      product_likes.user_id = ?
    ORDER BY 
      product_likes.product_like_id;
  `

  try {
    const [pcollections] = await db.query(sql, [userId])
    res.json({ pcollections })
  } catch (error) {
    console.error('獲取使用者產品收藏時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})
//不同使用者的訂單細節課程部分
router.get('/lessonorder/:userId', async (req, res) => {
  const userId = req.params.userId

  let sql = `
    SELECT 
        course.*, 
        teacher.t_name AS course_teacher_name,
        users.user_id AS user_id,
        \`order\`.order_id,
        SUM(order_detail.num) AS total_quantity
    FROM 
        \`order\`
    LEFT JOIN 
        \`order_detail\` ON \`order\`.order_id = \`order_detail\`.order_id
    JOIN 
        users ON \`order\`.user_id = users.user_id
    JOIN 
        course ON \`order_detail\`.course_id = course.course_id 
    JOIN 
        teacher ON course.teacher_id = teacher.teacher_id
    WHERE 
        \`order\`.user_id = ?
    GROUP BY
        \`order\`.order_id
    ORDER BY 
        \`order_detail\`.order_id;
`

  try {
    const [corders] = await db.query(sql, [userId])
    res.json({ corders })
  } catch (error) {
    console.error('獲取使用者購買課程時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

//不同使用者的訂單細節產品部分
router.get('/productorder/:userId', async (req, res) => {
  const userId = req.params.userId

  let sql = `
  SELECT 
      product.*, 
      users.user_id AS user_id,
      \`order\`.order_id,
      SUM(order_detail.num) AS total_quantity
  FROM 
      \`order\`
  JOIN 
      users ON \`order\`.user_id = users.user_id
  LEFT JOIN 
      \`order_detail\` ON \`order\`.order_id = \`order_detail\`.order_id
  JOIN 
      product ON \`order_detail\`.product_id = product.product_id 
  WHERE 
      \`order\`.user_id = ?
  GROUP BY
      \`order\`.order_id
  ORDER BY 
      \`order\`.order_id;
`

  try {
    const [porders] = await db.query(sql, [userId])
    res.json({ porders })
  } catch (error) {
    console.error('獲取使用者購買產品時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

// 不同使用者的訂單order
router.get('/productorder2/:userId', async (req, res) => {
  const userId = req.params.userId

  let sql = `
    SELECT 
        \`order\`.*, 
        users.user_id AS user_id
    FROM 
        \`order_detail\`
    JOIN 
        \`order\` ON \`order_detail\`.order_id = \`order\`.order_id
    JOIN 
        users ON \`order\`.user_id = users.user_id
    WHERE 
        \`order\`.user_id = ?
    ORDER BY 
        \`order_detail\`.order_id;
`

  try {
    const [porders2] = await db.query(sql, [userId])
    res.json({ porders2 })
  } catch (error) {
    console.error('獲取使用者購買產品時發生錯誤:', error)
    res.status(500).json({ message: '伺服器錯誤' })
  }
})

export default router
