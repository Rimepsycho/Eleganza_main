import { useState, useEffect } from 'react'
import React from 'react'
import styles from './productcollection.module.scss'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function ProductCard() {
  const { auth } = useAuth()
  const [isMobileButtonClicked, setIsMobileButtonClicked] = useState(false)

  const handleMobileButtonClick = () => {
    setIsMobileButtonClicked(!isMobileButtonClicked)
  }
  const [productDetails, setProductDetails] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          // 如果 localStorage 中沒有 accessToken，則不執行後續操作
          return
        }
        const parseJwt = (token) => {
          const base64Payload = token.split('.')[1]
          const payload = Buffer.from(base64Payload, 'base64')
          return JSON.parse(payload.toString())
        }

        // 解析 JWT 並提取 userData
        const userData = parseJwt(accessToken)

        setProductDetails(userData) // 更新使用者資料狀態
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserData() // 執行取得使用者資料的函式
  }, [])

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const url = `http://localhost:3005/api/my-lessoncollection/productcollection/${auth.userData.id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    if (Array.isArray(data.pcollections)) {
      setProducts(data.pcollections)
    } else {
      console.error('Collections data is not an array:', data.pcollections)
    }
  }
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getProducts()
  }, [])

  if (products.length === 0) {
    return (
      <>
        <div className={styles['mainarea-desktop-collection-empty']}>
          <div className={styles['emptycontent-empty']}>
            <p>您還未收藏任何商品</p>
          </div>
          <div className={styles['sbtn-empty']}>
            <Link href="/products">前往購買</Link>
          </div>
        </div>
        <div className={styles['lesson-mobile-empty']}>
          <div className={styles['emptycontent-empty']}>
            <p>您還未收藏任何商品</p>
          </div>
          <div className={styles['sbtn-empty']}>
            <Link href="/products">前往購買</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {products.map((v, i) => (
        <div key={v.user_id}>
          <div
            className={`${styles['productcard']} ${isMobileButtonClicked ? styles['mobile-clicked'] : ''}`}
          >
            <Link href={`/products/${v.product_id}`}>
              <img
                src={`/images/product_images/${v.img}`}
                alt=""
                className={styles['productcardimg']}
              />
            </Link>
            <div className={styles['product-word']}>
              <ul className={`${styles.productcardtitle} list-unstyled`}>
                <li className={styles['productbranding']}>
                  <Link href={`/products/${v.product_id}`}>{v.brand}</Link>
                </li>
                <li>
                  <Link
                    className={styles['productname']}
                    href={`/products/${v.product_id}`}
                  >
                    {v.name}
                  </Link>
                </li>
              </ul>
              <ul className={`${styles['productcard-function']} list-unstyled`}>
                <li className={styles['productprice']}>$ {v.product_price}</li>
                <Link
                  className={styles['icon-mobile']}
                  href="#"
                  onClick={handleMobileButtonClick}
                >
                  <img src="/icons/icon-chevron-right.svg" alt="手機版" />
                </Link>
                <div className={styles['productcardicons']}>
                  <Link href="">
                    <img src="/icons/icon-cart.svg" alt="購物車" />
                  </Link>
                  <Link href="">
                    <img src="/icons/icon-liked.svg" alt="收藏" />
                  </Link>
                </div>
              </ul>
            </div>
            {isMobileButtonClicked && (
              <div className={`${styles['productcard-hidden']} `}>
                <div className={styles['hiddenbtn']}>
                  <Link href="">加入購物車</Link>
                </div>
                <div className={styles['hiddenbtn']}>
                  <Link href="">刪除</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  )
}
