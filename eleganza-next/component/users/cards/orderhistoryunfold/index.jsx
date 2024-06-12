import { useState, useEffect } from 'react'
import React from 'react'
import styles from './orderhistoryunfold.module.scss'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function OrderHistoryUnfoldCard() {
  const { auth } = useAuth()
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState(null)

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

        setOrderDetails(userData) // 更新使用者資料狀態
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserData() // 執行取得使用者資料的函式
  }, [])

  const getOrders = async () => {
    const url = `http://localhost:3005/api/my-lessoncollection/productorder2/${auth.userData.id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    if (Array.isArray(data.porders2)) {
      setOrders(data.porders2)
    } else {
      console.error('Collections data is not an array:', data.porders2)
    }
  }
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getOrders()
  }, [])

  const [products, setProducts] = useState([])
  const [productsDetails, setProductsDetails] = useState([])

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

        setProductsDetails(userData) // 更新使用者資料狀態
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserData() // 執行取得使用者資料的函式
  }, [])

  const getProducts = async () => {
    const url = `http://localhost:3005/api/my-lessoncollection/productorder/${auth.userData.id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    if (Array.isArray(data.porders)) {
      setProducts(data.porders)
    } else {
      console.error('Collections data is not an array:', data.porders)
    }
  }
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getProducts()
  }, [])

  const [lessons, setLessons] = useState([])
  const [lessonsDetails, setLessonsDetails] = useState([])

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

        setLessonsDetails(userData) // 更新使用者資料狀態
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserData() // 執行取得使用者資料的函式
  }, [])

  const getLessons = async () => {
    const url = `http://localhost:3005/api/my-lessoncollection/lessonorder/${auth.userData.id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    if (Array.isArray(data.corders)) {
      setLessons(data.corders)
    } else {
      console.error('Collections data is not an array:', data.corders)
    }
  }
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getLessons()
  }, [])

  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const toggleDetail = () => {
    setIsDetailOpen(!isDetailOpen)
  }

  if (lessons.length === 0 && products.length === 0) {
    return (
      <>
        <div className={styles['mainarea-desktop-collection-empty']}>
          <div className={styles['emptycontent-empty']}>
            <p>您尚未有任何商品的購買紀錄</p>
          </div>
          <div className={styles['sbtn-empty']}>
            <Link href="/products">前往購買</Link>
          </div>
        </div>
        <div className={styles['lesson-mobile-empty']}>
          <div className={styles['emptycontent-empty']}>
            <p>您尚未有任何商品的購買紀錄</p>
          </div>
          <div className={styles['sbtn-empty']}>
            <Link href="/products">前往購物</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {orders.map((order, orderIndex) => (
        <div key={orderIndex}>
          {/* 桌面端樣式 */}
          <div
            className={`${styles['orderhistoryrow-l']} ${styles['desktop-only']}`}
          >
            <p>{order.order_id}</p>
            <p>{order.order_date}</p>
            <p>$ {order.total_price}</p>
            <p>{order.status}</p>
            <div className={`${styles['checkdetail']}`}>
              <p style={{ margin: 0 }}>查看詳情</p>
              <Link href="#" onClick={toggleDetail}>
                <img src="/icons/icon-chevron-down.svg" alt="" />
              </Link>
            </div>
          </div>
          {/* 手機端樣式 */}
          <div
            className={`${styles['orderhistoryrow-l']} ${styles['mobile-only']}`}
          >
            <p>{order.order_id}</p>
            <p>{order.order_date}</p>
            <p>{order.status}</p>
            <Link href="#" onClick={toggleDetail}>
              <img src="/icons/icon-chevron-down.svg" alt="" />
            </Link>
          </div>
          {isDetailOpen && (
            <div className={`${styles['orderhistorydetailrow']} `}>
              <div className={styles.orderdetailleft}>
                {/* 只展開當前訂單中的商品 */}
                {products
                  .concat(lessons)
                  .filter((item) => item.order_id === order.order_id)
                  .map((item, index) => (
                    <div key={index}>
                      <div className={styles.orderhistorydetail}>
                        <div className={styles.orderimg}>
                          <Link
                            href={
                              item.product_id
                                ? `/products/${item.product_id}`
                                : `/course/${item.course_id}`
                            }
                          >
                            <img
                              src={
                                item.product_id
                                  ? `/images/product_images/${item.img}`
                                  : `/images/course_images/${item.course_img}`
                              }
                              alt={item.alt}
                            />
                          </Link>
                        </div>
                        <div className={styles.orderwords}>
                          <div className={styles.ordertitle}>
                            <Link
                              href={
                                item.product_id
                                  ? `/products/${item.product_id}`
                                  : `/teacher`
                              }
                              className={styles.orderbrand}
                            >
                              {item.brand || `${item.course_teacher_name} 教師`}
                            </Link>
                            <Link
                              href={
                                item.product_id
                                  ? `/products/${item.product_id}`
                                  : `/course/${item.course_id}`
                              }
                            >
                              {item.name || item.course_name}
                            </Link>
                          </div>
                          <div className={styles.orderprice}>
                            <p>$ {item.product_price || item.course_price}</p>
                            <div className={styles.orderquantity}>
                              <img src="/icons/icon-x.svg" alt="" />
                              <p>
                                {item.product_id
                                  ? item.total_quantity
                                  : item.total_quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              {/* 繼續詳細內容的部分 */}
              <div className={`${styles['orderhistorydetail2']} `}>
                <div className={styles.creditcard}>
                  <p>{order.payment_method}</p>
                  <div className={styles.creditcardno}>
                    <p>{order.creditcard_no}</p>
                    <img
                      src="/icons/visa-credit-card-logo-payment-mastercard-usa-visa-e2526db464dd09168c03c4916787dd35.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className={styles.creditcard}>
                  <p>{order.shipping_method}</p>
                  <div className={styles.creditcardno}>
                    <p>{order.address}</p>
                  </div>
                </div>
              </div>
              <div className={`${styles['mobiletotal']} `}>
                <p>總計</p>
                <p>$ {order.total_price}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}
