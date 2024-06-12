import express from 'express'
const router = express.Router()

import sequelize from '#configs/db.js'
const { Product, User, Course, Comment } = sequelize.models

User.hasMany(Comment, { foreignKey: 'user_id' })
Product.hasMany(Comment, { foreignKey: 'product_id' })
Course.hasMany(Comment, { foreignKey: 'course_id' })

Comment.belongsTo(User, { foreignKey: 'user_id' })
Comment.belongsTo(Product, { foreignKey: 'product_id' })
Comment.belongsTo(Course, { foreignKey: 'course_id' })

//得到文章的所有評論
router.get('/', async function (req, res) {
  const articleId = req.query.articleId // 從查詢參數取得文章ID
  if (!articleId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'Article ID is required' })
  }

  try {
    const commentResults = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'], // 只包含用戶名
        },
      ],
      where: { article_id: articleId }, //使用文章ID過濾評論
      logging: console.log,
    })

    if (commentResults.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No comments found for this article',
      })
    }
    //評論列印
    // console.log(JSON.stringify(commentResults, null, 2))

    return res.json({ status: 'success', data: { comments: commentResults } })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Error fetching comments' })
  }
})

// 得到某產品的所有評論
router.get('/product/:productId', async function (req, res) {
  const { productId } = req.params
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'], // 只包含用戶名
        },
      ],
      where: { product_id: productId }, //根據商品ID過濾評論
      logging: console.log,
    })

    if (comments.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No comments found for this product',
      })
    }

    return res.json({ status: 'success', data: { comments } })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Error fetching comments' })
  }
})

// 得到某課程的所有評論
router.get('/course/:id', async (req, res) => {
  const { id } = req.params // 修改此行，將 courseId 改為 id
  try {
    const comments = await Comment.findAll({
      include: [{ model: User, attributes: ['user_name'] }],
      where: { course_id: id }, // 將 courseId 改為 id
      logging: console.log,
    })

    return res.json({
      status: 'success',
      data: { comments: comments.length > 0 ? comments : 'No comments found' },
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Error fetching comments' })
  }
})

//新增評論
router.post('/', async function (req, res) {
  const { userId, articleId, productId, courseId, rating, commentText } =
    req.body
  // 檢查至少有一個 ID 是有效的
  if (!articleId && !productId && !courseId) {
    return res
      .status(400)
      .json({ message: 'At least one ID must be valid to post a comment.' })
  }
  try {
    const newComment = await Comment.create({
      user_id: userId,
      article_id: articleId || null,
      product_id: productId || null,
      course_id: courseId || null,
      comment_star: rating,
      comment_content: commentText,
    })

    return res
      .status(201)
      .json({ status: 'success', data: { comment: newComment } })
  } catch (error) {
    console.error('Error creating comment:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Error creating comment' })
  }
})

export default router
