import { useState, useEffect } from 'react'
import classNames from 'classnames'
import animation from './CSS/animation.module.css'
import pageCart from './CSS/page_cart.module.css'
import pageCheckOut from './CSS/page_check_out.module.css'
import pageComplete from './CSS/page_complete.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'
import useFormFieldValidation from '@/hooks/useFormFieldValidation'

const ShoppingCart = () => {
  const [progress, setProgress] = useState(10)

  const [checkoutVisible, setCheckoutVisible] = useState(false)
  const [pageCartAnimation, setPageCartAnimation] = useState(false)
  const [pageCartAnimation1, setPageCartAnimation1] = useState(false)
  const [pageCartAnimationdps, setPageCartAnimationdps] = useState(false)
  const [pageCartAnimationdps1, setPageCartAnimationdps1] = useState(false)
  const [checkoutAnimation, setCheckoutAnimation] = useState(false)
  const [checkoutAnimation1, setCheckoutAnimation1] = useState(false)
  const [pageCompleteVisible, setPageCompleteVisible] = useState(false)

  const [selectedShippingMethod, setSelectedShippingMethod] = useState('')
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [isBillingAddressVisible, setIsBillingAddressVisible] = useState(true)

  const handleButtonClick = () => {
    setCheckoutVisible(true)

    // 開始動畫
    setPageCartAnimation(true)
    setTimeout(() => {
      setPageCartAnimationdps(true)
    }, 250)

    setTimeout(() => {
      setCheckoutAnimation(true)
    }, 50)

    setProgress(55) // 當按下按鈕時，將進度更新為 55%
  }

  const [totalPrice, setTotalPrice] = useState(0) // 初始化總價格為0

  const [cartItems, setCartItems] = useState([]) // 用於存儲購物車項目
  const [total, setTotal] = useState(0) // 用於存儲購物車總金額
  const [itemCount, setItemCount] = useState(0) // 用於存儲購物車商品數量
  const [isCartEmpty, setIsCartEmpty] = useState(true) // 用於檢查購物車是否為空

  const router = useRouter()

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    const storedAccessToken = localStorage.getItem('accessToken')

    if (storedUserId && storedAccessToken) {
      // 發送獲取購物車資料的請求
      axios
        .get(`http://localhost:3005/api/cart/${storedUserId}`, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        })
        .then((response) => {
          // 讀取完資料後，更新狀態
          setCartItems(response.data.data.cartItems)
          setIsCartEmpty(response.data.data.cartItems.length === 0)

          // 進一步的邏輯，例如計算總價格等
          const newTotal = response.data.data.cartItems.reduce(
            (total, cartItem) => {
              const price = cartItem.product_price || cartItem.course_price
              return total + price * cartItem.quantity
            },
            0,
          )

          // 設置總價格並加上運費
          setTotalPrice(newTotal + 100)
          setTotal(newTotal)
          setItemCount(response.data.data.cartItems.length)
        })
        .catch((error) => {
          console.error('Error fetching cart details:', error)
        })
    }
  }, [])

  const updateQuantity = async (index, newQuantity) => {
    const updatedCartItems = [...cartItems]
    const cartItem = updatedCartItems[index]

    if (newQuantity < 1) {
      updatedCartItems.splice(index, 1)
    } else {
      updatedCartItems[index] = {
        ...updatedCartItems[index],
        quantity: newQuantity,
      }
    }

    setCartItems(updatedCartItems)

    // 在 setCartItems 後立即執行相關的計算和 API 調用
    const newTotal = updatedCartItems.reduce((total, cartItem) => {
      const price = cartItem.product_price || cartItem.course_price
      return total + price * cartItem.quantity
    }, 0)
    setTotal(newTotal)
    setItemCount(updatedCartItems.length)
    setIsCartEmpty(updatedCartItems.length === 0)

    try {
      if (newQuantity < 1) {
        await axios.post(
          `http://localhost:3005/api/cart/decrease/${cartItem.shopping_cart_id}`,
          { product_id: cartItem.product_id, course_id: cartItem.course_id },
        )
      } else {
        await axios.put(
          `http://localhost:3005/api/cart/update/${cartItem.shopping_cart_id}`,
          { quantity: newQuantity },
        )
      }
    } catch (error) {
      console.error('更新購物車時出錯:', error)
    }
  }

  const {
    numbeInput,
    emailInput,
    telInput,
    nameInput,
    cardNumberInput,
    expiryInput,
    cvvInput,
    cityInput,
    postalCodeInput,
    streetInput,
    nameOnCardInput,
    billingAddressInput,
    sameAsShippingInput,
    validateFields,
    shippingMethodRef,
    paymentMethodRef,
  } = useFormFieldValidation(selectedShippingMethod, selectedPaymentMethod)

  const [orderId, setOrderId] = useState(null)

  const getValue = (ref) => {
    try {
      return ref.current.value
    } catch (error) {
      if (error instanceof TypeError) {
        return undefined
      }
      throw error
    }
  }

  const getChecked = (ref) => {
    try {
      return ref.current.checked
    } catch (error) {
      if (error instanceof TypeError) {
        return undefined
      }
      throw error
    }
  }

  const confirmPaymentBtn = () => {
    if (validateFields()) {
      // 從 localStorage 獲取 userId
      const userId = localStorage.getItem('userId')

      // 儲存 API URL 到變數
      const apiUrl = 'http://localhost:3005/api/order/checkout/' + userId

      // 傳送資料到後端 API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shippingMethod: getValue(shippingMethodRef),
          paymentMethod: getValue(paymentMethodRef),
          creditCardNo: getValue(cardNumberInput),
          totalPrice: totalPrice,
          email: getValue(emailInput),
          tel: getValue(telInput),
          name: getValue(nameInput),
          expiry: getValue(expiryInput),
          cvv: getValue(cvvInput),
          city: getValue(cityInput),
          street: getValue(streetInput),
          postalCode: getValue(postalCodeInput),
          nameOnCard: getValue(nameOnCardInput),
          billingAddress: getValue(billingAddressInput),
          sameAsShipping: getChecked(sameAsShippingInput),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data && data.order_id) {
            console.log('Setting orderId:', data.order_id)
            setOrderId(data.order_id)
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })

      setCheckoutAnimation(false)
      setPageCartAnimation(false)
      setTimeout(() => {
        setPageCartAnimationdps1(true)
        setPageCartAnimation1(true)
      }, 250)

      setTimeout(() => {
        setCheckoutAnimation1(true)
      }, 50)

      setProgress(104)
    }
  }

  const handleSelectChange = (event) => {
    const value = event.target.value
    setSelectedShippingMethod(value)

    // 根據選擇的值決定手風琴是否展開
    if (value === 'home_delivery') {
      setIsAccordionOpen(true) // 展開手風琴
    } else {
      setIsAccordionOpen(false) // 折疊手風琴
    }
  }

  const handlePaymentMethodChange = (event) => {
    const value = event.target.value
    setSelectedPaymentMethod(value)
  }

  const handleBillingAddressToggle = () => {
    setIsBillingAddressVisible(!isBillingAddressVisible)
  }

  const handleCheckboxChange = (event) => {
    // 切換帳單地址的可見性
    setIsBillingAddressVisible(!event.target.checked)
  }

  return (
    <>
      <title>Title</title>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {/* Bootstrap CSS v5.2.1 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+TC&family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="/eleganza-next/component/shopping_cart/CSS/page_cart.css"
      />
      <link
        rel="stylesheet"
        href="/eleganza-next/component/shopping_cart/CSS/page_check_out.css"
      />
      <link
        rel="stylesheet"
        href="/eleganza-next/component/shopping_cart/CSS/page_complete.css"
      />
      <link
        rel="stylesheet"
        href="/eleganza-next/component/shopping_cart/CSS/animation.css"
      />
      <style dangerouslySetInnerHTML={{ __html: '\n      \n   ' }} />
      {/* main */}
      <main className="wrap flex-grow-1">
        {/* ------------------頁面內容------------------------ */}
        <section className={`${pageCart['progress-bar-container']}`}>
          <div
            className={`${pageCart['progress-bar']}`}
            style={{ width: `${progress}%` }} // 根據進度狀態設置寬度
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </section>
        <div className={pageCart.steps}>
          <div className={pageCart.step}>確認購物車</div>
          <div className={pageCart.step}>填寫付款細節</div>
          <div className={pageCart.step}>購買成功</div>
        </div>

        <div
          className={classNames(
            pageCart['page-cart'],
            { [animation['checkout-slide-left']]: pageCartAnimation },
            { [animation['pagecart-dpn']]: pageCartAnimationdps },
          )}
          id="page-cart"
        >
          <div className={pageCart.cartContainer}>
            {/* 遍歷購物車項目並顯示 */}
            {cartItems.map((item, index) => (
              <div className={pageCart.product} key={item.id}>
                <article className={pageCart['product-card-middle']}>
                  <img
                    src={`/images/${item.img ? 'product_images/' + item.img : 'course_images/' + item.course_img}`}
                    className={pageCart['product-image-c']}
                    loading="lazy"
                  />
                  {/* src={`@/public/images/product_images/${item.product_img || `@/public/images/course_images/${item.course_img`} */}
                  <section className={pageCart['product-info']}>
                    <p className={pageCart['product-name']}>
                      {item.name || item.course_name} {/* 顯示商品或課程名稱 */}
                    </p>
                    {item.course_name && <p>{item.t_name} 教師</p>}
                  </section>
                  <div className={pageCart['quantity-selector']}>
                    <button
                      className={pageCart['quantity-minus']}
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      ref={numbeInput}
                      value={item.quantity}
                      className={pageCart['quantity-input']}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value, 10))
                      }
                    />
                    <button
                      className={pageCart['quantity-plus']}
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className={pageCart['product-price']}>
                    ${(item.product_price || item.course_price) * item.quantity}{' '}
                    {/* 顯示商品價格乘以數量 */}
                  </p>
                </article>
              </div>
            ))}

            {/* 購物車總結信息 */}
            <div className={pageCart['cart']} id="cart">
              <section className={pageCart['cart-summary']}>
                <h2 className={pageCart['cart-item-count']}>
                  共{itemCount}項商品
                </h2>
                <div className={pageCart['ubtotal-container']}>
                  <span className={pageCart['subtotal-label']}>小計</span>
                  <span className={pageCart['subtotal-amount']}>
                    ${total}
                  </span>{' '}
                  {/* 顯示購物車總金額 */}
                </div>
                <button
                  className={pageCart['checkout-button']}
                  onClick={handleButtonClick}
                >
                  前往付款
                </button>
              </section>
            </div>
          </div>
        </div>

        {/*                            付款頁面                             */}

        <div
          className={classNames(pageCheckOut['check-out'], {
            [animation['checkout-slide-right']]: checkoutAnimation,
            [animation['checkout-slide-left']]: pageCartAnimation1,

            [animation['pagecart-dpn']]: pageCartAnimationdps1,
          })}
        >
          {/* ${animation['hidden']}`} */}
          <div className={`${pageCheckOut['contact-info-container']}`}>
            <h2 className={`${pageCheckOut['contact-info-title']}`}>
              聯絡資訊
            </h2>
            <input
              type="text"
              ref={nameInput}
              className={`${pageCheckOut['input-field']}`}
              placeholder="姓名"
              aria-label="姓名"
            />
            <input
              type="email"
              ref={emailInput}
              className={`${pageCheckOut['input-field']}`}
              placeholder="電子郵件"
              aria-label="電子郵件"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="請輸入有效的電子郵件地址"
            />
            <input
              type="tel"
              ref={telInput}
              className={`${pageCheckOut['input-field']}`}
              placeholder="電話號碼"
              aria-label="電話號碼"
              pattern="[0-9]{10}"
              title="請輸入有效的電話號碼（10位數字）"
            />
            <h2 className={`${pageCheckOut['shipping-method-title']}`}>
              選擇寄送方式
            </h2>
            <div className={`${pageCheckOut['shipping-method-select']}`}>
              <select
                id="shipping-method"
                className={`${pageCheckOut['shipping-method-text']}`}
                onChange={handleSelectChange}
                value={selectedShippingMethod}
                ref={shippingMethodRef}
              >
                <option value="shipping-method">選擇寄送方式</option>
                <option value="pickup">於本中心領貨</option>
                <option value="pickup_course">於本中心上課</option>
                <option value="home_delivery">宅配到府</option>
              </select>
            </div>
            {isAccordionOpen && (
              <div
                className={`${pageCheckOut['shipping-method-details']} ${animation['collapsed']}`}
                id="home-delivery-details"
              >
                <input
                  type="city"
                  ref={cityInput}
                  className={`${pageCheckOut['input-field']}`}
                  placeholder="城市,區"
                  aria-label="城市,區"
                />
                <input
                  type="postal"
                  ref={postalCodeInput}
                  className={`${pageCheckOut['input-field']}`}
                  placeholder="郵遞區號"
                  aria-label="郵遞區號"
                />
                <input
                  type="street"
                  ref={streetInput}
                  className={`${pageCheckOut['input-field']}`}
                  placeholder="街道,巷弄,門號,樓層"
                  aria-label="街道,巷弄,門號,樓層"
                />
              </div>
            )}
            <div className={`${pageCheckOut['-method-container']}`}>
              <h2 className={`${pageCheckOut['shipping-method-title']}`}>
                付款資訊
              </h2>
              <div className={`${pageCheckOut['payment-method-icons']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d793ff12c9e7ccb38b53b6ef56c1d7667fc107057dc041a58fd084b7c754eb0b?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Visa"
                  className={`${pageCheckOut['visa-icon']}`}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/da39e3a6ca7aaa8890d3d9bc926fed0768149fe97b31d5649be11c0a41794469?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Mastercard"
                  className={`${pageCheckOut['mastercard-icon']}`}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/29b2ac74a242ed1654a62be41034d55217513d67d2edd28a243249cb1665b9f9?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="JCB"
                  className={`${pageCheckOut['jcb-icon']}`}
                />
              </div>
              <div>
                <div className={`${pageCheckOut['payment-method-text']}`}>
                  <select
                    id="payment-method"
                    onChange={handlePaymentMethodChange}
                    value={selectedPaymentMethod}
                    className={`${pageCheckOut['shipping-method-text']}`}
                    ref={paymentMethodRef}
                  >
                    <option value="payment-method">選擇付款方式</option>
                    <option value="credit_card">信用卡付款</option>
                    <option value="cash_on_delivery">現場付款</option>
                  </select>
                </div>
              </div>
              {selectedPaymentMethod === 'credit_card' && (
                <div
                  id="credit-card-details"
                  className={`${pageCheckOut['collapsed']}`}
                >
                  <input
                    type="text"
                    ref={cardNumberInput}
                    className={`${pageCheckOut['card-number-input']}`}
                    placeholder="信用卡號"
                    aria-label="Card number"
                    pattern="[0-9]{13,16}"
                    title="請輸入13至16位數字的信用卡號"
                    required
                  />

                  <div className={`${pageCheckOut['expiry-cvv-container']}`}>
                    <input
                      type="text"
                      ref={expiryInput}
                      className={`${pageCheckOut['expiry-input']}`}
                      placeholder="有效期限(月/年)"
                      aria-label="Expiration date(MM/YY)"
                      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      title="請輸入有效的有效期限，格式為 MM/YY"
                      required
                    />
                    <input
                      type="text"
                      ref={cvvInput}
                      className={`${pageCheckOut['cvv-input']}`}
                      placeholder="安全碼"
                      aria-label="Security code"
                      pattern="[0-9]{3,4}"
                      title="請輸入3至4位數字的安全碼"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    ref={nameOnCardInput}
                    className={`${pageCheckOut['name-on-card-input']}`}
                    placeholder="持卡人姓名"
                    aria-label="Name on card"
                  />
                  {isBillingAddressVisible && (
                    <input
                      type="text"
                      ref={billingAddressInput}
                      className={`${pageCheckOut['name-on-card-input']} ${pageCheckOut['collapsed']}`}
                      placeholder="帳單地址"
                      aria-label="billing address"
                      id="billing-address"
                    />
                  )}
                  <div className={`${pageCheckOut['billing-address-toggle']}`}>
                    <input
                      type="checkbox"
                      ref={sameAsShippingInput}
                      id="same-as-shipping"
                      style={{
                        display:
                          selectedShippingMethod === 'home_delivery'
                            ? 'block'
                            : 'none',
                      }}
                      onChange={handleCheckboxChange}
                      checked={!isBillingAddressVisible}
                    />

                    {selectedShippingMethod === 'home_delivery' && (
                      <label htmlFor="same-as-shipping">
                        帳單地址與送貨地址相同
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
            <button
              className={`${pageCheckOut['confirm-payment-button']}`}
              onClick={confirmPaymentBtn}
            >
              確認付款
            </button>
          </div>

          <div
            className={`${pageCheckOut['product-list']} ${pageCheckOut['collapsed992']}`}
            id="product-list"
          >
            <section>
              {cartItems.map((item, index) => (
                <div key={index}>
                  <article className={pageCheckOut['product-item']}>
                    <div className={pageCheckOut['product-image']}>
                      <img
                        src={`/images/${item.img ? 'product_images/' + item.img : 'course_images/' + item.course_img}`}
                        alt="Karl Höfner Allegro 3/4 Violin Outfit"
                      />
                    </div>
                    <div className={pageCheckOut['product-details']}>
                      <div className={pageCheckOut['product-info']}>
                        <div className={pageCheckOut['product-brand']}>
                          {item.name || item.course_name}{' '}
                          {/* 顯示商品或課程名稱 */}
                        </div>
                        {item.name || item.course_name}
                        {/* 只有在讀取 course_name 時顯示教師名稱 */}
                      </div>
                      <div className={pageCheckOut['product-price']}>
                        $
                        {(item.product_price || item.course_price) *
                          item.quantity}{' '}
                        {/* 顯示商品價格 */}
                      </div>
                      <div className={pageCheckOut['product-quantity1']}>
                        {item.quantity}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
              <div className={`${pageCheckOut['order-summary']}`}>
                <div className={`${pageCheckOut['order-discounts']}`}>
                  <div className={`${pageCheckOut['shipping-row']}`}>
                    <div className={`${pageCheckOut['shipping-label']}`}>
                      運費
                    </div>
                    <div className={`${pageCheckOut['shipping-amount']}`}>
                      +$100
                    </div>
                  </div>
                </div>
                <div className={`${pageCheckOut['order-total']}`}>
                  <div className={`${pageCheckOut['total-label']}`}>總計</div>
                  <div className={`${pageCheckOut['total-amount']}`}>
                    ${totalPrice}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/*---------------------- 完成訂單 -----------------------*/}
        <div
          className={classNames(pageComplete['page-complete'], {
            [animation['checkout-slide-right']]: checkoutAnimation1,
            [animation['checkout-slide-left']]: pageCartAnimation,
          })}
        >
          <main className={`${pageComplete['order-complete-container']}`}>
            <h1 className={`${pageComplete['order-complete-title']}`}>
              訂單已完成
            </h1>
            {cartItems.map((item, index) => (
              <div key={index}>
                <section className={`${pageComplete['product-item1']}`}>
                  <div className={`${pageComplete['product-image-wrapper']}`}>
                    <img
                      src={`/images/${item.img ? 'product_images/' + item.img : 'course_images/' + item.course_img}`}
                      alt="Product Image"
                      className={`${pageComplete['product-image']}`}
                    />
                  </div>
                  <div className={`${pageComplete['product-details']}`}>
                    <div className={`${pageComplete['product-info']}`}>
                      <p className={`${pageComplete['product-brand']}`}>
                        {item.name || item.course_name}{' '}
                      </p>
                    </div>
                    <p className={`${pageComplete['product-price']}`}>
                      {' '}
                      ${item.product_price || item.course_price}{' '}
                    </p>
                    <p className={`${pageComplete['product-quantity']}`}>
                      {item.quantity}
                    </p>
                  </div>
                </section>
              </div>
            ))}
            <section className={`${pageComplete['order-summary1']}`}>
              {orderId && (
                <div className={`${pageComplete['order-summary-row']}`}>
                  <p className={`${pageComplete['order-summary-label']}`}>
                    訂單編號
                  </p>
                  <p className={`${pageComplete['order-summary-value']}`}>
                    #{orderId}
                  </p>
                </div>
              )}
              <div className={`${pageComplete['order-summary-row']}`}>
                <p className={`${pageComplete['order-summary-label']}`}>
                  下單日期
                </p>
                <p className={`${pageComplete['order-summary-value']}`}>
                  {new Date().toLocaleDateString('zh-Hant')}
                </p>
              </div>

              <div className={`${pageComplete['order-summary-row']}`}>
                <p className={`${pageComplete['order-summary-label']}`}>總計</p>
                <p className={`${pageComplete['order-summary-value']}`}>
                  ${total}
                </p>
              </div>
            </section>
            <div className={`${pageComplete['order-actions']}`}>
              <a
                className={`${pageComplete['order-history-button']}`}
                href="http://localhost:3000/users/order-history/order-history"
              >
                歷史訂單
              </a>
              <a
                className={`${pageComplete['back-to-products-button']}`}
                href="http://localhost:3000/products"
              >
                返回商品頁
              </a>
            </div>
          </main>
        </div>
      </main>
    </>
  )
}

export default ShoppingCart
