import React from 'react'
import styles from './product-card.module.scss'
import LoginForm from '@/component/users/form/login'
import { useState } from 'react'
import useAlert from '@/hooks/use-alert'

export default function ProductCard({
  product_id,
  img,
  price,
  name,
  brand,
  addToCart,
  auth,
  setShowLoginPrompt,
}) {
  // 加入收藏 阻止冒泡
  const { success, error } = useAlert()
  const handleLinkClick = async (event) => {
    if (event.target.classList.contains(styles['cart'])) {
      event.preventDefault()
      if (!auth.isLoggedIn) {
        setShowLoginPrompt(true)
      } else {
        addToCart({ id: product_id, type: 'product' })
        success('商品已加入購物車')
      }
    }
  }

  return (
    <>
      <div
        className={`${styles['product']} h-100 d-flex flex-column justify-content-between `}
      >
        <div className="d-flex flex-column flex-grow-1">
          <div className={`p-3`}>
            <div className="ratio ratio-1x1">
              <img
                className={`${styles['obj-fit']}`}
                src={`/images/product_images/${img}`}
                alt=""
              />
            </div>
          </div>
          <div
            className={`${styles['info']} py-2 px-3 d-flex flex-column flex-grow-1 h-100 justify-content-between `}
          >
            <div className="mb-2 mb-sm-3">
              <div className={styles['brand']}>{brand}</div>
              <div className={styles['product-name']}>{name}</div>
            </div>
            <div className="d-flex justify-content-between">
              $ {price}
              <div className="d-flex justify-content-between">
                <img
                  className={`${styles['like']} pe-2`}
                  src="/icons/icon-like.svg"
                  alt=""
                />
                <img
                  className={`${styles['cart']}`}
                  src="/icons/icon-cart.svg"
                  alt=""
                  onClick={handleLinkClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
