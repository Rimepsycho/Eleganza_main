import { useState } from 'react'
import styles from './product-detail.module.scss'
import useAddToCart from '@/hooks/useAddToCart'
import { useAuth } from '@/hooks/use-auth'
import LoginForm from '@/component/users/form/login'
import useAlert from '@/hooks/use-alert'

export default function ProductDetail({ product }) {
  const productName = product.name.replace(product.brand, '')
  // 要加入的商品數量
  const [num, setNum] = useState(1)
  const handleIncrese = () => {
    const next = num + 1
    setNum(next)
  }
  const handleDecrese = () => {
    let prev = num - 1
    if (prev - 1 < 0) {
      prev = 1
    }
    setNum(prev)
  }

  // 購物車的洨
  const { success, error } = useAlert()
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
      // error('無法加入購物車')
    } else {
      addToCart({ id: product.product_id, type: 'product', num: num })
      success('商品已加入購物車')
    }
  }

  return (
    <>
      <div className={`${styles['product-info']}`}>
        <div className={styles.brand + ' mb-1'}>{product.brand}</div>
        <div className={styles['product-name'] + ' mb-1'}>{productName}</div>
        <div className={'d-flex align-items-center ' + styles.rating}>
          <img src="/icons/icon-star-solid.svg" alt="" />
          <img src="/icons/icon-star-solid.svg" alt="" />
          <img src="/icons/icon-star-solid.svg" alt="" />
          <img src="/icons/icon-star-solid.svg" alt="" />
          <img src="/icons/icon-star-solid.svg" alt="" />
          <span className="ms-1 mt-1">4.3(24)</span>
        </div>
        <div className={styles.price}>${product.product_price}</div>
        <div className="d-flex justify-content-between">
          <img
            className={`${styles['like']}`}
            src="/icons/icon-like.svg"
            alt=""
          />
          <div className={'d-flex ' + styles.num}>
            <div
              className={`${styles['minus']} d-flex align-items-center`}
              onClick={handleDecrese}
            >
              <img src="/icons/icon-minus.svg" alt="" />
            </div>
            <div className={styles['num-area']}>{num}</div>
            <div
              className={`${styles['plus']} d-flex align-items-center`}
              onClick={handleIncrese}
            >
              <img src="/icons/icon-plus.svg" alt="" />
            </div>
          </div>
          <button className="flex-grow-1" onClick={handleLinkClick}>
            加入購物車
          </button>
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
