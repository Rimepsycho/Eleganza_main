import express from 'express'
import db from '#configs/mysql.js'
const router = express.Router()

//全部資料
router.get('/', async function (req, res) {
  const productsSql = `SELECT * FROM product WHERE product_category_id = 1`

  try {
    const [rows] = await db.query(productsSql)

    return res.json({
      status: 'success',
      data: {
        products: rows,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

// 商品分類篩選
router.post('/', async function (req, res) {
  const { cateIndex } = req.body

  // console.log(req.body)
  let productCateSql = `SELECT * FROM product WHERE product_category_id = ${cateIndex + 1}`
  //   if (cateIndex === 0) {
  //     productCateSql = `SELECT * FROM product`
  //   }
  let [rows] = await db.query(productCateSql)
  try {
    res.json({
      status: 'success',
      data: {
        products: rows,
      },
    })
  } catch (error) {
    console.log(error)
  }
})

// 單筆及推薦資料
router.get('/:id', async function (req, res) {
  const { id } = req.params
  // console.log(id)
  // console.log(res.json)
  const productSql = `
  SELECT 
  product.product_id,
  product.product_category_id,
  product.name,
  product.brand,
  product.size,
  product.top,
  product.back_and_sides,
  product.neck,
  product.fingerboard,
  product.bow,
  product.strings,
  product.num,
  product.product_price,
  product.status,
  product.img,
  product.introduction,
  GROUP_CONCAT(imgs.pic) AS pics
  FROM 
  product 
  INNER JOIN 
  imgs ON imgs.product_id = product.product_id 
  WHERE 
  product.product_id = ${id};
  `
  const recommendSql = `
  SELECT * FROM product WHERE product_id ORDER BY RAND() LIMIT 5
  `

  const [rows] = await db.query(productSql)
  const [row] = await db.query(recommendSql)

  let output = {
    status: 'success',
    data: {
      product: rows,
      suggest_products: row,
    },
  }
  try {
    output.data.suggest_products = row
    output.data.product = rows[0]
  } catch (error) {
    console.log(error)
  }

  return res.json(output)
})
export default router
