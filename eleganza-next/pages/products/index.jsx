import ProductCard from '@/component/product/card/product-card'
import FilterLeft from '@/component/product/filter-left'
import NavTop from '@/component/product/nav-top'
import Pagination from '@/component/product/pagination'
import { useState } from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

// 加入購物車的判斷
import useAddToCart from '@/hooks/useAddToCart'
import useAlert from '@/hooks/use-alert'
import LoginForm from '@/component/users/form/login'
import { useAuth } from '@/hooks/use-auth'

export default function Products() {
  const [products, setProducts] = useState([])
  const [productCate, setProductCate] = useState(0)
  const [checkboxStatus, setCheckboxStatus] = useState(false)
  const [filterProduct, setFilterProduct] = useState(products)
  const [selectedOption, setSelectedOption] = useState('預設排序')

  // 取得產品數據
  const getProduct = async () => {
    const url = 'http://localhost:3005/api/products'
    try {
      const res = await fetch(url)
      const data = await res.json()
      // console.log(data)

      if (Array.isArray(data.data.products)) {
        setProducts(data.data.products)
        setFilterProduct(data.data.products)
        setFilterProduct(data.data.products)
        //   console.log('success')
        //   console.log(products)
      } else {
        alert('u mom is dead')
      }
    } catch (e) {
      console.log(e)
    }
  }

  // 產品分類
  const handleCateClick = async (cateIndex) => {
    setProductCate(cateIndex)
    const url = `http://localhost:3005/api/products`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cateIndex }),
      })
      const data = await res.json()

      if (Array.isArray(data.data.products)) {
        setProducts(data.data.products)
        setFilterProduct(data.data.products)
        setCheckboxStatus(false)
        setPagination(0)
        setSelectedOption('預設排序')

        //   console.log('success')
      } else {
        alert('u mom is dead')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 篩選checkbox 父元素提升
  const handleCheckboxStatus = (option) => {
    setCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [option]: !prevStatus[option],
    }))
  }

  // 商品篩選
  const queryParams = []
  const addedKeys = new Set()
  const filterKeys = Object.entries(checkboxStatus)

  filterKeys.forEach(([key, value]) => {
    products.forEach((product) => {
      if (addedKeys.has(key)) {
        return
      }
      if (product.brand === key && value === true) {
        addedKeys.add(key)
        queryParams.push({ brand: key })
      } else if (product.size == key && value === true) {
        addedKeys.add(key)
        queryParams.push({ size: key })
      } else if (key.includes('頂板') && value === true) {
        let formattedKey = key.replace('頂板', '')
        addedKeys.add(key)
        queryParams.push({ top: formattedKey })
      } else if (key.includes('側板') && value === true) {
        let formattedKey = key.replace('側板', '')
        addedKeys.add(key)
        queryParams.push({ back_and_sides: formattedKey })
      } else if (key.includes('指板') && value === true) {
        let formattedKey = key.replace('指板', '')
        addedKeys.add(key)
        queryParams.push({ fingerboard: formattedKey })
      } else if (key.includes('琴頸') && value === true) {
        let formattedKey = key.replace('琴頸', '')
        addedKeys.add(key)
        queryParams.push({ neck: formattedKey })
      }
    })
  })

  //   console.log(queryParams)

  const handleFilterChange = () => {
    const seenProductIds = new Set()
    let filteredProducts = []

    if (queryParams.length === 0) {
      setFilterProduct(products)
      return
    }

    // 遍歷每個篩選條件
    const filterConditions = {}
    queryParams.forEach((qp) => {
      const key = Object.keys(qp)[0]
      const value = Object.values(qp)[0]
      if (!filterConditions[key]) {
        filterConditions[key] = new Set()
      }
      filterConditions[key].add(value)
    })

    // 遍歷產品，檢查每個產品是否滿足所有篩選條件
    products.forEach((product) => {
      let matchesAllConditions = true

      // 檢查產品是否滿足所有篩選條件
      for (let key in filterConditions) {
        if (!filterConditions[key].has(product[key])) {
          matchesAllConditions = false
          break
        }
      }

      // 如果產品滿足所有條件且未出現過，則加入結果
      if (matchesAllConditions && !seenProductIds.has(product.product_id)) {
        seenProductIds.add(product.product_id)
        filteredProducts.push(product)
      }
    })
    if (JSON.stringify(filteredProducts) !== JSON.stringify(filterProduct)) {
      // 更新 filterProduct 狀態
      setFilterProduct(filteredProducts)
      setSelectedOption('預設排序')
    }
  }

  // 產品排序
  const handleOptionClick = (option) => {
    setSelectedOption(option)
  }

  // 產品查詢
  const [showInput, setShowInput] = useState(false)
  const handleClick = () => {
    setShowInput(!showInput)
  }

  const [params, setParams] = useState('')
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    setParams(searchValue)
    if (params == '') {
      setFilterProduct(products)
    } else {
      // 根據搜索參數過濾產品列表並更新過濾後的產品
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue),
      )
      setFilterProduct(filtered)
    }
  }

  const renderProductName = (productName) => {
    const index = productName.toLowerCase().indexOf(params)
    if (index === -1) {
      return productName
    }
    return (
      <>
        {productName.substring(0, index)}
        <span style={{ color: 'red', background: '#dddddd' }}>
          {productName.substring(index, index + params.length)}
        </span>
        {productName.substring(index + params.length)}
      </>
    )
  }

  // 頁面初次渲染之後伺服器要求資料
  useEffect(() => {
    getProduct()
  }, [])

  // 陣列變動時重新篩選資料
  useEffect(() => {
    handleFilterChange()
  }, [checkboxStatus])

  useEffect(() => {
    // 根據 selectedOption 的值對商品列表進行排序
    switch (selectedOption) {
      case '預設排序':
        setFilterProduct(
          [...filterProduct].sort((a, b) => a.product_id - b.product_id),
        )
        break
      case '價格由低至高':
        setFilterProduct(
          [...filterProduct].sort((a, b) => a.product_price - b.product_price),
        )
        break
      case '價格由高至低':
        setFilterProduct(
          [...filterProduct].sort((a, b) => b.product_price - a.product_price),
        )
        break
      default:
        // 不進行排序
        break
    }
  }, [selectedOption])

  // 分頁邏輯

  const [pagination, setPagination] = useState(0)

  // 共有幾頁
  const pageCount = Math.ceil(filterProduct.length / 12)
  //  console.log(pagination)
  const handlePageClick = (page) => {
    const currentPage = page * 12
    setPagination(currentPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 判斷登入狀態
  const { auth } = useAuth()

  // 加入購物車
  const { addToCart } = useAddToCart()

  // 謝林靜
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const handleConfirmLogin = () => {
    setShowLoginPrompt(false)
    setShowOffcanvas(true)
  }
  return (
    <>
      <NavTop
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
        setProducts={setProducts}
        products={products}
        checkboxStatus={checkboxStatus}
        handleCheckboxStatus={handleCheckboxStatus}
        setCheckboxStatus={setCheckboxStatus}
        productCate={productCate}
        setProductCate={setProductCate}
        handleCateClick={handleCateClick}
        handleClick={handleClick}
        showInput={showInput}
        filterProduct={filterProduct}
        handleSearch={handleSearch}
        params={params}
      />
      <div className="products">
        <div className="row justify-content-between">
          <div className="col-3 d-none d-md-block">
            <FilterLeft
              products={products}
              setProducts={setProducts}
              checkboxStatus={checkboxStatus}
              handleCheckboxStatus={handleCheckboxStatus}
              productCate={productCate}
            />
          </div>
          <div className="col col-md-9">
            <div className="row g-3 g-xl-4 row-cols-2 row-cols-sm-3 row-cols-xl-4">
              {filterProduct.length == 0 ? (
                <div className="col w-100 text-center">沒有符合條件的產品</div>
              ) : (
                filterProduct
                  .slice(pagination, pagination + 12)
                  .map((product) => {
                    const { name, brand, product_price, img, product_id } =
                      product
                    const productName = name.replace(brand, '')
                    return (
                      <div className="col" key={product.product_id}>
                        <Link href={`/products/${product.product_id}`}>
                          <ProductCard
                            name={renderProductName(productName)}
                            brand={renderProductName(brand)}
                            price={product_price}
                            img={img}
                            product_id={product_id}
                            addToCart={addToCart}
                            auth={auth}
                            setShowLoginPrompt={setShowLoginPrompt}
                          />
                        </Link>
                      </div>
                    )
                  })
              )}
            </div>
            {filterProduct.length == 0 ? (
              ''
            ) : (
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                pagination={pagination}
              />
            )}
          </div>
        </div>
        {showLoginPrompt && (
          <>
            <div className={`overlaybg`}>
              <div className={`popupwindow`}>
                <p>請先登入</p>
                <button onClick={handleConfirmLogin}>確定</button>
              </div>
            </div>
          </>
        )}
        <div
          className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`}
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={() => setShowOffcanvas(false)}
            ></button>
          </div>
          <div className="offcanvas-body">
            <LoginForm />
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .products {
            margin-bottom: 40px;
            @media screen and (min-width: 768px) {
              margin-bottom: 0;
            }
          }
          .overlaybg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            background: rgba(130, 130, 130, 0.5);
            z-index: 9999;
          }
          .popupwindow {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 20px 60px;
            background: var(--color-text-light);
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
            border-radius: 8px;
            & p {
              margin: 0;
              font-size: 20px;
            }
          }
          .popupwindow button {
            background-color: #322826;
            font-size: 16px;
            color: #fffdfd;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
          }

          .popupwindow button:hover {
            background-color: #211c1a;
          }
        `}
      </style>
    </>
  )
}
