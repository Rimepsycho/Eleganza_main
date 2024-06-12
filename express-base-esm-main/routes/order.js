import express from 'express'
import { Sequelize, QueryTypes } from 'sequelize'
import morgan from 'morgan'

const router = express.Router()
const sequelize = new Sequelize('db_violin', 'Eleganza', '12345', {
  host: 'localhost',
  dialect: 'mysql',
})

router.use(morgan('combined'))

router.post('/checkout/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const {
      shippingMethod,
      paymentMethod,
      creditCardNo,
      totalPrice,
      city,
      street,
    } = req.body

    // 將英文的送貨方式轉換為中文
    const shippingMethodMap = {
      pickup: '於本中心領貨',
      pickup_course: '於本中心上課',
      home_delivery: '宅配到府',
    }
    const shippingMethodInChinese = shippingMethodMap[shippingMethod]
    if (!shippingMethodInChinese) {
      throw new Error(`Unknown shipping method: ${shippingMethod}`)
    }

    // 將英文的付款方式轉換為中文
    const paymentMethodMap = {
      credit_card: '信用卡付款',
      cash_on_delivery: '現場付款',
    }
    const paymentMethodInChinese = paymentMethodMap[paymentMethod]
    if (!paymentMethodInChinese) {
      throw new Error(`Unknown payment method: ${paymentMethod}`)
    }

    console.log('城市:', city)
    console.log('街道,巷弄,門號,樓層:', street)

    let finalAddress
    if (shippingMethodInChinese === '宅配到府') {
      finalAddress = `${city}, ${street}`
    } else {
      finalAddress = '新北市三重區慈愛街18號'
    }

    const creditCardNoToInsert =
      paymentMethodInChinese === '信用卡付款' ? creditCardNo : 'NULL'

    // console.log('接收到的用戶 ID:', userId)
    // console.log('送貨方式:', shippingMethodInChinese亂)
    // console.log('地址:', finalAddress)
    // console.log('付款方式:', paymentMethodInChinese)
    // console.log('信用卡號:', creditCardNo)
    // console.log('總價:', totalPrice)

    let orderId
    let isDuplicate = true
    while (isDuplicate) {
      orderId = Math.floor(100000000 + Math.random() * 900000000)
      const existingOrder = await sequelize.query(
        `SELECT order_id FROM \`order\` WHERE order_id = ${orderId}`,
        { type: QueryTypes.SELECT }
      )
      if (existingOrder.length === 0) {
        isDuplicate = false
      }
    }

    const cartItems = await sequelize.query(
      `SELECT * FROM \`shopping_cart\` WHERE user_id = ${userId}`,
      { type: QueryTypes.SELECT }
    )

    // 在迴圈外面插入一個新的訂單
    await sequelize.query(
      `INSERT INTO \`order\` (order_id, user_id, shipping_method, address, payment_method, creditcard_no, total_price, status, order_date) VALUES (${orderId}, ${userId}, '${shippingMethodInChinese}', '${finalAddress}', '${paymentMethodInChinese}', '${creditCardNoToInsert}', ${totalPrice}, '未取貨', NOW())`,
      { type: QueryTypes.INSERT }
    )

    for (let item of cartItems) {
      console.log(`Product ID: ${item.product_id}, Quantity: ${item.quantity}`) // 新增的 console.log

      // 在迴圈裡面插入訂單詳情
      await sequelize.query(
        `INSERT INTO order_detail (order_id, product_id, course_id, num) VALUES (${orderId}, ${item.product_id}, ${item.course_id}, ${item.quantity})`,
        { type: QueryTypes.INSERT }
      )
    }

    // 清空該用戶的購物車
    await sequelize.query(
      `DELETE FROM shopping_cart WHERE user_id = ${userId}`,
      { type: QueryTypes.DELETE }
    )

    res.status(200).send({ message: '結帳成功', order_id: orderId })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send({ message: '結帳失敗', error })
  }
})

export default router
