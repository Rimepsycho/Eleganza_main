import React from 'react'
import PropTypes from 'prop-types'
import animation from './CSS/animation.module.css'
import pageCart from './CSS/page_cart.module.css'
import pageCheckOut from './CSS/page_check_out.module.css'
import pageComplete from './CSS/page_complete.module.css'
import { fadeInAnimation } from './js/animation'; 


const ShoppingCart = () => {
  
    
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
            role="progressbar"
            aria-valuenow={30}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </section>
        <div className={pageCart.steps}>
          <div className={pageCart.step}>確認購物車</div>
          <div className={pageCart.step}>填寫付款細節</div>
          <div className={pageCart.step}>購買成功</div>
        </div>
        <div className={`${pageCart['page-cart']}`} id="page-cart">
          <div className={pageCart.product} id="product">
            <article className={`${pageCart['product-card-top']}`}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f1d627dceee4057ee7f64539d7667224af4f6f8bd39b5622e4511fafccf6df0?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Karl Höfner Allegro 3/4 Violin Outfit"
                className={`${pageCart['product-image-c']}`}
              />
              <div className={`${pageCart['product-info']}`}>
                <h3 className={`${pageCart['product-brand']}`}>Karl Höfner</h3>
                <p className={`${pageCart['product-name']}`}>Allegro 3/4 Violin Outfit</p>
              </div>
              <div className={`${pageCart['quantity-selector']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/896f1ccf4c325c5d13d014388729f03d5722c00ab19bf2235f1e7e5e91e044bb?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Decrease quantity"
                  className={`${pageCart['quantity-minus']}`}
                />
                <input
                  type="number"
                  defaultValue={1}
                  className={`${pageCart['quantity-input']}`}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd5920c4a0e660858cabbd5a5e74510b0fc2fa3b4d6401e1418d5cdf01e7d71?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Increase quantity"
                  className={`${pageCart['quantity-plus']}`}
                />
              </div>
              <p className={`${pageCart['product-price']}`}>$8,5000</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/56bb5e88fb78f3e7e89560a544073630784608309879b88c8af098c7f5ab25ac?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Remove item"
                className={`${pageCart['delete-icon']}`}
              />
            </article>
            <article className={`${pageCart['product-card-middle']}`}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/772096d8d9e12d7d4ef14047e5109d79a1bd44c64d1b47dc1c42ccf52813bac3?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Product Image"
                className={`${pageCart['product-image-c']}`}
                loading="lazy"
              />
              <section className={`${pageCart['product-info']}`}>
                <h2 className={`${pageCart['lesson-title']}`}>小提琴演奏初階個別課</h2>
                <p className={`${pageCart['teacher-name']}`}>伍俊彥 教師</p>
                <time className={`${pageCart['lesson-datetime']}`}>2024/11/01, 18:00~20:00</time>
              </section>
              <div className={`${pageCart['quantity-selector']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/896f1ccf4c325c5d13d014388729f03d5722c00ab19bf2235f1e7e5e91e044bb?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Decrease quantity"
                  className={`${pageCart['quantity-minus']}`}
                />
                <input
                  type="number"
                  defaultValue={1}
                  className={`${pageCart['quantity-input']}`}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd5920c4a0e660858cabbd5a5e74510b0fc2fa3b4d6401e1418d5cdf01e7d71?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Increase quantity"
                  className={`${pageCart['quantity-plus']}`}
                />
              </div>
              <p className={`${pageCart['product-price']}`}>$8,5000</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/56bb5e88fb78f3e7e89560a544073630784608309879b88c8af098c7f5ab25ac?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Remove item"
                className={`${pageCart['delete-icon']}`}
              />
            </article>
            <article className={`${pageCart['product-card-middle']}`}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f1d627dceee4057ee7f64539d7667224af4f6f8bd39b5622e4511fafccf6df0?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Karl Höfner Allegro 3/4 Violin Outfit"
                className={`${pageCart['product-image-c']}`}
              />
              <div className={`${pageCart['product-info']}`}>
                <h3 className={`${pageCart['product-brand']}`}>Karl Höfner</h3>
                <p className={`${pageCart['product-name']}`}>Allegro 3/4 Violin Outfit</p>
              </div>
              <div className={`${pageCart['quantity-selector']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/896f1ccf4c325c5d13d014388729f03d5722c00ab19bf2235f1e7e5e91e044bb?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Decrease quantity"
                  className={`${pageCart['quantity-minus']}`}
                />
                <input
                  type="number"
                  defaultValue={1}
                  className={`${pageCart['quantity-input']}`}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd5920c4a0e660858cabbd5a5e74510b0fc2fa3b4d6401e1418d5cdf01e7d71?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Increase quantity"
                  className={`${pageCart['quantity-plus']}`}
                />
              </div>
              <p className={`${pageCart['product-price']}`}>$8,5000</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/56bb5e88fb78f3e7e89560a544073630784608309879b88c8af098c7f5ab25ac?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Remove item"
                className={`${pageCart['delete-icon']}`}
              />
            </article>
            <article className={`${pageCart['product-card-bottom']}`}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f1d627dceee4057ee7f64539d7667224af4f6f8bd39b5622e4511fafccf6df0?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Karl Höfner Allegro 3/4 Violin Outfit"
                className={`${pageCart['product-image-c']}`}
              />
              <div className={`${pageCart['product-info']}`}>
                <h3 className={`${pageCart['product-brand']}`}>Karl Höfner</h3>
                <p className={`${pageCart['product-name']}`}>Allegro 3/4 Violin Outfit</p>
              </div>
              <div className={`${pageCart['quantity-selector']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/896f1ccf4c325c5d13d014388729f03d5722c00ab19bf2235f1e7e5e91e044bb?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Decrease quantity"
                  className={`${pageCart['quantity-minus']}`}
                />
                <input
                  type="number"
                  defaultValue={1}
                  className={`${pageCart['quantity-input']}`}
                />
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd5920c4a0e660858cabbd5a5e74510b0fc2fa3b4d6401e1418d5cdf01e7d71?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Increase quantity"
                  className={`${pageCart['quantity-plus']}`}
                />
              </div>
              <p className={`${pageCart['product-price']}`}>$8,5000</p>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/56bb5e88fb78f3e7e89560a544073630784608309879b88c8af098c7f5ab25ac?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                alt="Remove item"
                className={`${pageCart['delete-icon']}`}
              />
            </article>
          </div>
          <div className={pageCart.cart} id="cart">
            <section className={`${pageCart['cart-summary']}`}>
              <h2 className={`${pageCart['cart-item-count']}`}>共4項商品</h2>
              <div className={`${pageCart['subtotal-container']}`}>
                <span className={`${pageCart['subtotal-label']}`}>小計</span>
                <span className={`${pageCart['subtotal-amount']}`}>$3,3580</span>
              </div>
              <p className={`${pageCart['shipping-note']}`}>運費將於結帳時計算</p>
              <button className={`${pageCart['checkout-button']}`} id="animateBtn">
                前往付款
              </button>
            </section>
          </div>
        </div>
        {/*                            付款頁面                             */}
        <div className={`${pageCheckOut['check-out']} ${animation['hidden']}`}>
          <div className={`${pageCheckOut['contact-info-container']}`}>
            <h2 className={`${pageCheckOut['contact-info-title']}`}>聯絡資訊</h2>
            <input
              type="text"
              className={`${pageCheckOut['input-field']}`}
              placeholder="姓名"
              aria-label="姓名"
            />
            <input
              type="email"
              className={`${pageCheckOut['input-field']}`}
              placeholder="電子郵件"
              aria-label="電子郵件"
            />
            <input
              type="tel"
              className={`${pageCheckOut['input-field']}`}
              placeholder="電話號碼"
              aria-label="電話號碼"
            />
            <h2 className={`${pageCheckOut['shipping-method-title']}`}>選擇寄送方式</h2>
            <div className={`${pageCheckOut['shipping-method-select']}`}>
              <select
                id="shipping-method"
                className={`${pageCheckOut['shipping-method-text']}`}
                onchange="toggleAccordion()"
              >
                <option value="shipping-method">選擇寄送方式</option>
                <option value="pickup">現場取貨</option>
                <option value="home_delivery">送貨到府</option>
              </select>
            </div>
            <div
              className={`${pageCheckOut['shipping-method-details']} ${pageCheckOut['collapsed']}`}
              id="home-delivery-details"
            >
              <input
                type="text"
                className={`${pageCheckOut['input-field']}`}
                placeholder="城市,區"
                aria-label="城市,區"
              />
              <input
                type="text"
                className={`${pageCheckOut['input-field']}`}
                placeholder="郵遞區號"
                aria-label="郵遞區號"
              />
              <input
                type="text"
                className={`${pageCheckOut['input-field']}`}
                placeholder="街道,巷弄,門號,樓層"
                aria-label="街道,巷弄,門號,樓層"
              />
            </div>
            <div className={`${pageCheckOut['-method-container']}`}>
              <h2 className={`${pageCheckOut['shipping-method-title']}`}>付款資訊</h2>
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
                    onchange="togglePaymentDetails()"
                    className={`${pageCheckOut['shipping-method-text']}`}
                  >
                    <option value="payment-method">選擇付款方式</option>
                    <option value="credit_card">信用卡付款</option>
                    <option value="cash_on_delivery">現場付款</option>
                  </select>
                </div>
              </div>
              <div id="credit-card-details" className={`${pageCheckOut['collapsed']}`}>
                <input
                  type="text"
                  className={`${pageCheckOut['card-number-input']}`}
                  placeholder="信用卡號"
                  aria-label="Card number"
                />
                <div className={`${pageCheckOut['expiry-cvv-container']}`}>
                  <input
                    type="text"
                    className={`${pageCheckOut['expiry-input']}`}
                    placeholder="有效期限(年/月)"
                    aria-label="Expiration date(MM/YY)"
                  />
                  <input
                    type="text"
                    className={`${pageCheckOut['cvv-input']}`}
                    placeholder="安全碼"
                    aria-label="Security code"
                  />
                </div>
                <input
                  type="text"
                  className={`${pageCheckOut['name-on-card-input']}`}
                  placeholder="持卡人姓名"
                  aria-label="Name on card"
                />
                <input
                  type="text"
                  className={`${pageCheckOut['name-on-card-input']} ${pageCheckOut['collapsed']}`}
                  placeholder="帳單地址"
                  aria-label="billing address"
                  id="billing-address"
                />
                <div className={`${pageCheckOut['billing-address-toggle']}`}>
                  <input
                    type="checkbox"
                    id="same-as-shipping"
                    onchange="toggleBillingAddress()"
                    defaultChecked=""
                  />
                  <label htmlFor="same-as-shipping">
                    帳單地址與送貨地址相同
                  </label>
                </div>
              </div>
            </div>
            <button className={`${pageCheckOut['confirm-payment-button']}`} id="confirmPaymentBtn">
              確認付款
            </button>
          </div>
          {/*                             付款細節                          */}
        <div
            className={`${pageCheckOut['product-summary']}`}
            id="product-summary"
            // onClick={toggleAccordion}
            value="product_summary"
            >
            <div className={`${pageCheckOut['product-summary-header']}`}>
              <div className={`${pageCheckOut['product-count']}`}>共4項商品</div>
              <div className={`${pageCheckOut['view-details']}`}>
                <div className={`${pageCheckOut['view-details-text']}`}>查看細節</div>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/89a2eb8b3f9339d8295e1ac0899f104210047ebb4df553dd921179c722d37977?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="View details icon"
                  className={`${pageCheckOut['view-details-icon']}`}
                />
              </div>
            </div>
          </div>
          {/* 手風琴中的內容 */}
          <div className={`${pageCheckOut['product-list']} ${pageCheckOut['collapsed992']}`} id="product-list">
            <section>
              <article className={`${pageCheckOut['product-item']}`}>
                <div className={`${pageCheckOut['product-image']}`}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cc8942c6894dd8f11e0c920c451d72effa179041967d336d10571a26fc990e6?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                    alt="Karl Höfner Allegro 3/4 Violin Outfit"
                  />
                </div>
                <div className={`${pageCheckOut['product-details']}`}>
                  <div className={`${pageCheckOut['product-info']}`}>
                    <div className={`${pageCheckOut['product-brand']}`}>Karl Höfner</div>
                    <div className={`${pageCheckOut['product-name']}`}>
                      Allegro 3/4 Violin Outfit
                    </div>
                  </div>
                  <div className={`${pageCheckOut['product-price']}`}>$8,5000</div>
                  <div className={`${pageCheckOut['product-quantity1']}`}>1</div>
                </div>
              </article>
              <article className={`${pageCheckOut['product-item']}`}>
                <div className={`${pageCheckOut['product-image']}`}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cc8942c6894dd8f11e0c920c451d72effa179041967d336d10571a26fc990e6?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                    alt="Karl Höfner Allegro 3/4 Violin Outfit"
                  />
                </div>
                <div className={`${pageCheckOut['product-details']}`}>
                  <div className={`${pageCheckOut['product-info']}`}>
                    <div className={`${pageCheckOut['product-brand']}`}>Karl Höfner</div>
                    <div className={`${pageCheckOut['product-name']}`}>
                      Allegro 3/4 Violin Outfit
                    </div>
                  </div>
                  <div className={`${pageCheckOut['product-price']}`}>$8,5000</div>
                  <div className={`${pageCheckOut['product-quantity1']}`}>1</div>
                </div>
              </article>
              <article className={`${pageCheckOut['product-item']}`}>
                <div className={`${pageCheckOut['product-image']}`}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cc8942c6894dd8f11e0c920c451d72effa179041967d336d10571a26fc990e6?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                    alt="Karl Höfner Allegro 3/4 Violin Outfit"
                  />
                </div>
                <div className={`${pageCheckOut['product-details']}`}>
                  <div className={`${pageCheckOut['product-info']}`}>
                    <div className={`${pageCheckOut['product-brand']}`}>Karl Höfner</div>
                    <div className={`${pageCheckOut['product-name']}`}>
                      Allegro 3/4 Violin Outfit
                    </div>
                  </div>
                  <div className={`${pageCheckOut['product-price']}`}>$8,5000</div>
                  <div className={`${pageCheckOut['product-quantity1']}`}>1</div>
                </div>
              </article>
              <div className={`${pageCheckOut['order-summary']}`}>
                <div className={`${pageCheckOut['order-discounts']}`}>
                  <div className={`${pageCheckOut['shipping-row']}`}>
                    <div className={`${pageCheckOut['shipping-label']}`}>運費</div>
                    <div className={`${pageCheckOut['shipping-amount']}`}>+$280</div>
                  </div>
                </div>
                <div className={`${pageCheckOut['order-total']}`}>
                  <div className={`${pageCheckOut['total-label']}`}>總計</div>
                  <div className={`${pageCheckOut['total-amount']}`}>$3,3580</div>
                </div>
              </div>
            </section>
          </div>
        </div>
        {/*---------------------- 完成訂單 -----------------------*/}
        <div className={`${pageComplete['page-complete']}`}>
          <main className={`${pageComplete['order-complete-container']}`}>
            <h1 className={`${pageComplete['order-complete-title']}`}>訂單已完成</h1>
            <section className={`${pageComplete['product-item1']}`}>
              <div className={`${pageComplete['product-image-wrapper']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a79c711ed1c7ee27ce78029780bf227a43d8cd32014909f2c9535a385bb8437?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Product Image"
                  className={`${pageComplete['product-image']}`}
                />
              </div>
              <div className={`${pageComplete['product-details']}`}>
                <div className={`${pageComplete['product-info']}`}>
                  <p className={`${pageComplete['product-brand']}`}>Karl Höfner</p>
                  <h2 className={`${pageComplete['product-name']}`}>Allegro 3/4 Violin Outfit</h2>
                </div>
                <p className={`${pageComplete['product-price']}`}>$8,5000</p>
                <p className={`${pageComplete['product-quantity']}`}>1</p>
              </div>
            </section>
            <section className={`${pageComplete['product-item1']}`}>
              <div className={`${pageComplete['product-image-wrapper']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a79c711ed1c7ee27ce78029780bf227a43d8cd32014909f2c9535a385bb8437?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Product Image"
                  className={`${pageComplete['product-image']}`}
                />
              </div>
              <div className={`${pageComplete['product-details']}`}>
                <div className={`${pageComplete['product-info']}`}>
                  <p className={`${pageComplete['product-brand']}`}>Karl Höfner</p>
                  <h2 className={`${pageComplete['product-name']}`}>Allegro 3/4 Violin Outfit</h2>
                </div>
                <p className={`${pageComplete['product-price']}`}>$8,5000</p>
                <p className={`${pageComplete['product-quantity']}`}>1</p>
              </div>
            </section>
            <section className={`${pageComplete['product-item1']}`}>
              <div className={`${pageComplete['product-image-wrapper']}`}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a79c711ed1c7ee27ce78029780bf227a43d8cd32014909f2c9535a385bb8437?apiKey=c27276553397403aa6ef8985c3e17cb4&"
                  alt="Product Image"
                  className={`${pageComplete['product-image']}`}
                />
              </div>
              <div className={`${pageComplete['product-details']}`}>
                <div className={`${pageComplete['product-info']}`}>
                  <p className={`${pageComplete['product-brand']}`}>Karl Höfner</p>
                  <h2 className={`${pageComplete['product-name']}`}>Allegro 3/4 Violin Outfit</h2>
                </div>
                <p className={`${pageComplete['product-price']}`}>$8,5000</p>
                <p className={`${pageComplete['product-quantity']}`}>1</p>
              </div>
            </section>
            <section className={`${pageComplete['order-summary1']}`}>
              <div className={`${pageComplete['order-summary-row']}`}>
                <p className={`${pageComplete['order-summary-label']}`}>訂單編號</p>
                <p className={`${pageComplete['order-summary-value']}`}>#65515151</p>
              </div>
              <div className={`${pageComplete['order-summary-row']}`}>
                <p className={`${pageComplete['order-summary-label']}`}>下單日期</p>
                <p className={`${pageComplete['order-summary-value']}`}>2024/12/6</p>
              </div>
              <div className={`${pageComplete['order-summary-row']}`}>
                <p className={`${pageComplete['order-summary-label']}`}>總計</p>
                <p className={`${pageComplete['order-summary-value']}`}>$3,3580</p>
              </div>
            </section>
            <div className={`${pageComplete['order-actions']}`}>
              <button className={`${pageComplete['order-history-button']}`}>歷史訂單</button>
              <button className={`${pageComplete['back-to-products-button']}`}>返回商品頁</button>
            </div>
          </main>
        </div>
      </main>
    </>
  )
}

export default ShoppingCart
