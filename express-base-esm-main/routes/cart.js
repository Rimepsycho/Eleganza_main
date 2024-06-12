import express from 'express'
import { Sequelize, QueryTypes } from 'sequelize'
// import ShoppingCart from '##/models/ShoppingCart.js'
// import Product from '##/models/Product.js'
// import Course from '##/models/Course.js'
// import Teacher from '##/models/Teacher.js'
// import authenticate from '#middlewares/authenticate.js'
import morgan from 'morgan' // 引入 morgan

const router = express.Router()
const sequelize = new Sequelize('db_violin', 'Eleganza', '12345', {
  host: 'localhost',
  dialect: 'mysql',
})

router.use(morgan('combined')) // 使用 morgan 中介軟體，並設定輸出格式為 'combined'

router.get('/:userId', async (req, res) => {
  try {
    const user_id = req.params.userId

    const cartItems = await sequelize.query(
      `
      SELECT * 
      FROM shopping_cart 
      LEFT JOIN product ON shopping_cart.product_id = product.product_id
      LEFT JOIN course ON shopping_cart.course_id = course.course_id
      LEFT JOIN teacher ON course.teacher_id = teacher.teacher_id
      WHERE shopping_cart.user_id = :user_id
      `,
      {
        replacements: { user_id },
        type: QueryTypes.SELECT,
      }
    )

    const total = cartItems.reduce((acc, item) => {
      const itemPrice = item.product_price || item.course_price || 0
      // console.log('商品價格:', itemPrice, '數量:', item.quantity)
      return acc + itemPrice * item.quantity
    }, 0)

    // console.log('購物車總金額:', total)

    res.json({ status: 'success', data: { cartItems, total } })
  } catch (error) {
    console.error('獲取購物車時出錯:', error)
    console.error('詳細錯誤訊息:', error.message)
    console.error('錯誤堆疊追蹤:', error.stack)
    console.error('完整的錯誤物件:', JSON.stringify(error, null, 2)) // 輸出完整的錯誤物件
    res.status(500).json({ status: 'error', message: '獲取購物車時出錯' })
  }
})

router.put('/update/:shopping_cart_id', async (req, res) => {
  const { shopping_cart_id } = req.params
  const { quantity } = req.body

  try {
    await sequelize.query(
      `
      UPDATE shopping_cart
      SET quantity = :quantity
      WHERE shopping_cart_id = :shopping_cart_id
      `,
      {
        replacements: { quantity, shopping_cart_id },
        type: QueryTypes.UPDATE,
      }
    )

    console.log('成功更新購物車項目')

    res.json({ status: 'success' })
  } catch (error) {
    console.error('更新購物車項目時出錯:', error)
    res.status(500).json({ status: 'error', message: '更新購物車項目時出錯' })
  }
})

router.post('/decrease/:shopping_cart_id', async (req, res) => {
  const { shopping_cart_id } = req.params

  try {
    const cartItem = await sequelize.query(
      `
      SELECT * 
      FROM shopping_cart 
      WHERE shopping_cart_id = :shopping_cart_id
      `,
      {
        replacements: { shopping_cart_id },
        type: QueryTypes.SELECT,
      }
    )

    if (cartItem.length === 0) {
      console.error('未找到要減少的購物車商品:', shopping_cart_id)
      return res
        .status(404)
        .json({ status: 'fail', message: '購物車中未找到該商品' })
    }

    let newQuantity = cartItem[0].quantity - 1

    // 如果商品數量小於等於 0，則刪除該商品
    if (newQuantity <= 0) {
      await sequelize.query(
        `
        DELETE FROM shopping_cart
        WHERE shopping_cart_id = :shopping_cart_id
        `,
        {
          replacements: { shopping_cart_id },
          type: QueryTypes.DELETE,
        }
      )

      console.log('成功刪除購物車商品')

      return res.json({ status: 'success' })
    }

    await sequelize.query(
      `
      UPDATE shopping_cart
      SET quantity = :quantity
      WHERE shopping_cart_id = :shopping_cart_id
      `,
      {
        replacements: { quantity: newQuantity, shopping_cart_id },
        type: QueryTypes.UPDATE,
      }
    )

    console.log('成功減少購物車商品數量')

    res.json({ status: 'success' })
  } catch (error) {
    console.error('減少購物車中商品時出錯:', error)
    res.status(500).json({ status: 'error', message: '減少購物車中商品時出錯' })
  }
})

router.post('/add', async (req, res) => {
  const { user_id, product_id, course_id, time } = req.body
  // const { day, time: timeString } = time

  // // 格式化 day 為 YYYY-MM-DD
  // const formattedDay = new Date(day).toISOString().split('T')[0]

  try {
    // 檢查使用者是否存在
    const userExists = await sequelize.query(
      `
      SELECT * 
      FROM users 
      WHERE user_id = :user_id
      `,
      {
        replacements: { user_id },
        type: QueryTypes.SELECT,
      }
    )

    // 如果使用者不存在，回傳錯誤
    if (userExists.length === 0) {
      console.error('使用者不存在:', user_id)
      return res.status(404).json({ status: 'fail', message: '使用者不存在' })
    }

    // 檢查商品或課程是否存在
    let itemExists = false
    let itemPrice = 0
    let itemType = ''
    let itemId = ''

    if (product_id) {
      const product = await sequelize.query(
        `
        SELECT * 
        FROM product 
        WHERE product_id = :product_id
        `,
        {
          replacements: { product_id },
          type: QueryTypes.SELECT,
        }
      )

      if (product.length === 0) {
        console.error('商品不存在:', product_id)
        return res.status(404).json({ status: 'fail', message: '商品不存在' })
      }

      itemExists = true
      itemPrice = product[0].product_price
      itemType = 'product'
      itemId = product_id
    } else if (course_id) {
      const { day, time: timeString } = time

      // 格式化 day 為 YYYY-MM-DD
      const formattedDay = new Date(day).toISOString().split('T')[0]

      const course = await sequelize.query(
        `
        SELECT * 
        FROM course 
        WHERE course_id = :course_id
        `,
        {
          replacements: { course_id },
          type: QueryTypes.SELECT,
        }
      )

      if (course.length === 0) {
        console.error('課程不存在:', course_id)
        return res.status(404).json({ status: 'fail', message: '課程不存在' })
      }

      itemExists = true
      itemPrice = course[0].course_price
      itemType = 'course'
      itemId = course_id
    }

    if (!itemExists) {
      console.error('未指定商品或課程')
      return res
        .status(400)
        .json({ status: 'fail', message: '未指定商品或課程' })
    }

    // 檢查購物車中是否已存在相同商品
    let existingItem
    if (product_id) {
      existingItem = await sequelize.query(
        `
        SELECT * 
        FROM shopping_cart 
        WHERE user_id = :user_id 
        AND product_id = :item_id
        `,
        {
          replacements: { user_id, item_id: itemId },
          type: QueryTypes.SELECT,
        }
      )
    } else if (course_id) {
      const { day, time: timeString } = time

      // 格式化 day 為 YYYY-MM-DD
      const formattedDay = new Date(day).toISOString().split('T')[0]

      existingItem = await sequelize.query(
        `
        SELECT * 
        FROM shopping_cart 
        WHERE user_id = :user_id 
        AND course_id = :item_id
        AND day = :day
        AND time = :time
        `,
        {
          replacements: {
            user_id,
            item_id: itemId,
            day: formattedDay,
            time: timeString,
          },
          type: QueryTypes.SELECT,
        }
      )
    }

    if (existingItem.length > 0) {
      // 如果購物車中已存在相同商品，回傳錯誤
      return res
        .status(400)
        .json({ status: 'fail', message: '該商品已經在購物車中了' })
    }

    // 將商品ID或課程ID新增到購物車,並設定數量為 1
    if (itemType === 'course') {
      const { day, time: timeString } = time

      // 格式化 day 為 YYYY-MM-DD
      const formattedDay = new Date(day).toISOString().split('T')[0]

      await sequelize.query(
        `
      INSERT INTO shopping_cart (user_id, ${itemType}_id, day, time, quantity)
      VALUES (:user_id, :item_id, :day, :time, 1)
      `,
        {
          replacements: {
            user_id,
            item_id: itemId,
            day: formattedDay,
            time: timeString,
          },
          type: QueryTypes.INSERT,
        }
      )
    } else {
      await sequelize.query(
        `
      INSERT INTO shopping_cart (user_id, ${itemType}_id, quantity)
      VALUES (:user_id, :item_id, 1)
      `,
        {
          replacements: { user_id, item_id: itemId },
          type: QueryTypes.INSERT,
        }
      )
    }

    console.log('成功新增購物車項目')

    res.json({ status: 'success', message: '新增購物車商品成功' })
  } catch (error) {
    console.error('新增購物車項目時出錯:', error)
    res.status(500).json({ status: 'error', message: '新增購物車項目時出錯' })
  }
})

export default router
