import React from 'react'
import styles from './recommend.module.scss'
import ProductCard from '../card/product-card'
import useAddToCart from '@/hooks/useAddToCart'
import { useAuth } from '@/hooks/use-auth'
import LoginForm from '@/component/users/form/login'
import { useState } from 'react'
import useAlert from '@/hooks/use-alert'

export default function Recommend({ recommendProduct }) {
   
  // console.log(recommendProduct)
  // 購物車的洨
  const { success, error } = useAlert() // 使用自定义的提示函数
  const [showOffcanvas, setShowOffcanvas] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const handleConfirmLogin = () => {
    setShowLoginPrompt(false)
    setShowOffcanvas(true)
  }
  const { addToCart } = useAddToCart()
  const { auth } = useAuth()

  const handleLinkClick = async (event) => {
    if (!auth.isLoggedIn) {
      setShowLoginPrompt(true)
      error('無法加入購物車')
    } else {
      addToCart({ id: product.product_id, type: 'product' })
      success('商品已加入購物車')
    }
  }
  return (
    <>
      <div className={styles['product-recommend']}>
        <div className="d-flex justify-content-between">
          <span className={styles['also']}>你可能也喜歡</span>
        </div>
        <div className={`${styles['product-list']} d-flex`}>
          {recommendProduct.map((product, i) => {
            const productName = product.name.replace(product.brand, '')
            const { product_id, name, brand, product_price, img } = product

            return (
              <div className="col" key={product_id}>
                <a href={`/products/${product_id}`}>
                  <ProductCard
                    name={productName}
                    brand={brand}
                    price={product_price}
                    img={img}
                    product_id={product_id}
                    addToCart={addToCart}
                    auth={auth}
                    setShowLoginPrompt={setShowLoginPrompt}
                    handleLinkClick={handleLinkClick}
                  />
                </a>
              </div>
            )
          })}
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
      <style jsx>
        {`
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
