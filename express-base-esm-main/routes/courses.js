import express from 'express'
import db from '../configs/mysql2.js'

const router = express.Router()

// GET - 獲取所有課程
router.get('/', async function (req, res) {
  try {
    const [courses] = await db.query(`
      SELECT course.*, teacher.t_name AS teacher_name 
      FROM course 
      LEFT JOIN teacher ON course.teacher_id = teacher.teacher_id
    `)
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: '找不到課程資料' })
    }
    return res.json({ status: 'success', data: { courses } })
  } catch (error) {
    console.error('獲取課程時出錯:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '無法取得課程資料' })
  }
})

// GET - 獲取單個課程
router.get('/:id', async function (req, res) {
  const courseId = req.params.id // 獲取動態路由參數中的 id
  try {
    const [courses] = await db.query(
      `
      SELECT course.*, teacher.t_name AS teacher_name 
      FROM course 
      LEFT JOIN teacher ON course.teacher_id = teacher.teacher_id 
      WHERE course.course_id = ?
    `,
      [courseId]
    )
    const course = courses[0]
    if (!course) {
      return res
        .status(404)
        .json({ status: 'error', message: '找不到指定的課程' })
    }
    return res.json({ status: 'success', data: { course } })
  } catch (error) {
    console.error('獲取指定課程時出錯:', error)
    return res
      .status(500)
      .json({ status: 'error', message: '無法取得指定的課程' })
  }
})

// GET - 搜索課程
router.get('/search/:keyword', async function (req, res) {
  const keyword = req.params.keyword // 獲取動態路由參數中的 keyword
  try {
    const [courses] = await db.query(
      `
      SELECT course.*, teacher.t_name AS teacher_name 
      FROM course 
      LEFT JOIN teacher ON course.teacher_id = teacher.teacher_id 
      WHERE course.course_name LIKE ? OR course.course_description LIKE ? OR teacher.t_name LIKE ?
    `,
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    )
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ status: 'error', message: '找不到符合條件的課程' })
    }
    return res.json({ status: 'success', data: { courses } })
  } catch (error) {
    console.error('搜索課程時出錯:', error)
    return res.status(500).json({ status: 'error', message: '搜索課程時出錯' })
  }
})

export default router
