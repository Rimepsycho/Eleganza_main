// eslint-disable-next-line
import { fakerZH_TW as faker } from '@faker-js/faker'

// 讓console.log可以呈現檔案與行號, 呈現顏色用
import { extendLog, toKebabCase } from '#utils/tool.js'
import 'colors'
extendLog()

import { readJsonFile, writeJsonFile } from '#utils/tool.js'

// 預設產生檔案目錄(相對於根目錄)
const folder = './seeds-tmp/'

// 品牌名稱，為了要取名稱設為全域
const brands = ['Nike', 'adidas', 'PUMA', 'New Balance']

const createBrands = async (filename = 'Brand.json') => {
  const allBrands = brands.map((v, i) => {
    return {
      id: i + 1,
      name: v,
      img: '',
      info: 'This is the description of the brand',
    }
  })

  await writeJsonFile(filename, allBrands, folder)
  console.log(`INFO - "${filename}" 檔案已建立完成`.bgCyan)
}

// 以下建立分類用 模型Category
const mainCats = ['服飾', '鞋類', '配件']
const subCats = [
  ['短袖上衣', '短褲', '長袖上衣', '長褲', '外套'],
  ['慢跑鞋', '籃球鞋'],
  ['包款', '帽類'],
]
// 所有分類，為了要取名稱設為全域
let allCats = []

const createCats = async (filename = 'Category.json') => {
  const mCats = mainCats.map((v, i) => {
    return { id: i + 1, name: v, parent_id: null }
  })

  allCats = [...mCats]
  let idIndex = mCats.length + 1

  for (let i = 0; i < subCats.length; i++) {
    for (let j = 0; j < subCats[i].length; j++) {
      const item = { id: idIndex, name: subCats[i][j], parent_id: i + 1 }
      allCats.push(item)
      idIndex++
    }
  }

  await writeJsonFile(filename, allCats, folder)
  console.log(`INFO - "${filename}" 檔案已建立完成`.bgCyan)
}

// 以下建立產品用 模型Product
const genProduct = () => {
  const photos = faker.helpers
    .arrayElements(['t1.jpg', 't2.jpg', 't3.jpg', 't4.jpg', 't5.jpg'], 3)
    .join(',')

  const brand_id = faker.number.int({ min: 1, max: 4 })
  const cat_id = faker.number.int({ min: 4, max: 12 })
  const name = `${faker.commerce.productName()} - ${brands[brand_id - 1]} ${
    allCats[cat_id - 1].name
  }`

  return {
    sn: faker.string.uuid(),
    name,
    photos,
    stock: faker.number.int({ min: 1, max: 10 }) * 10,
    price: faker.number.int({ min: 15, max: 150 }) * 100,
    info: faker.commerce.productDescription(),
    brand_id,
    cat_id,
    color: faker.helpers
      .arrayElements([1, 2, 3, 4], { min: 1, max: 4 })
      .join(','),
    tag: faker.helpers
      .arrayElements([1, 2, 3, 4], {
        min: 1,
        max: 3,
      })
      .join(','),
    size: faker.helpers
      .arrayElements([1, 2, 3, 4], {
        min: 1,
        max: 4,
      })
      .join(','),
  }
}

const productSize = []
const productColor = []
const productTag = []

const createProducts = async (num = 1, filename = 'Product.json') => {
  const products = Array(num)
    .fill(1)
    .map((v, i) => {
      // 建立各關聯資料表
      const id = i + 1
      const product = genProduct()

      const sizeList = product.size.split(',').map((v2, i2) => {
        return { pid: id, sid: Number(v2) }
      })

      const colorList = product.color.split(',').map((v2, i2) => {
        return { pid: id, cid: Number(v2) }
      })

      const tagList = product.tag.split(',').map((v2, i2) => {
        return { pid: id, tid: Number(v2) }
      })

      productSize.push(...sizeList)
      productColor.push(...colorList)
      productTag.push(...tagList)

      return { id, ...product }
    })

  await writeJsonFile(filename, products, folder)
  console.log(`INFO - "${num}" 筆範例, "${filename}" 檔案已建立完成`.bgCyan)

  await writeJsonFile('Product_Size.json', productSize, folder)
  await writeJsonFile('Product_Color.json', productColor, folder)
  await writeJsonFile('Product_Tag.json', productTag, folder)
  console.log(
    `INFO - "Product_Size.json" "Product_Color.json" "Product_Tag.json"檔案已建立完成`
      .bgCyan
  )
}

// 使用指令 `node ./cli/fake-user.js 100`
const args = process.argv
// 預設為10筆
const num = Number(args[2]) || 100

await createBrands()
// 需先產生分類，商品名稱上才會有分類名稱
// 共產生Category.json與Product.json兩檔案
await createCats()
await createProducts(num)

// 訊息
console.log('範例檔案已建立完成'.bgBlue)
// eslint-disable-next-line
process.exit()
