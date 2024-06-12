import {  } from '@/hooks/cartapi' // 引用 API 函數
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import animation from './CSS/animation.module.css'
import pageCart from './CSS/page_cart.module.css'
import useCartApi from '@/hooks/cartapi';

const ShoppingCart = () => {
<div
          className={classNames(
            pageCart['page-cart'],
            { [animation['checkout-slide-left']]: pageCartAnimation },
            { [animation['pagecart-dpn']]: pageCartAnimationdps },
          )}
          id="page-cart"
        >
          <div className={pageCart.product}>
            {cartItems.map((item) => (
              <article
                key={item.product_id}
                className={`${pageCart['product-card']}`}
              >
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  className={`${pageCart['product-image-c']}`}
                />
                <div className={`${pageCart['product-info']}`}>
                  <h3 className={`${pageCart['product-name']}`}>
                    {item.product_name}
                  </h3>
                </div>
                <div className={`${pageCart['quantity-selector']}`}>
                  <img
                    src="minus_icon_url"
                    alt="Decrease quantity"
                    onClick={() => handleDecrease(item)}
                    className={`${pageCart['quantity-minus']}`}
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className={`${pageCart['quantity-input']}`}
                  />
                  <img
                    src="plus_icon_url"
                    alt="Increase quantity"
                    onClick={() => handleIncrease(item)}
                    className={`${pageCart['quantity-plus']}`}
                  />
                </div>
                <p className={`${pageCart['product-price']}`}>
                  ${item.product_price}
                </p>
                <img
                  src="delete_icon_url"
                  alt="Remove item"
                  onClick={() => handleRemove(item)}
                  className={`${pageCart['delete-icon']}`}
                />
              </article>
            ))}
          </div>
          <div className={pageCart.cart} id="cart">
            <section className={`${pageCart['cart-summary']}`}>
              <h2 className={`${pageCart['cart-item-count']}`}>共項商品</h2>
              <div className={`${pageCart['subtotal-container']}`}>
                <span className={`${pageCart['subtotal-label']}`}>小計</span>
                <span className={`${pageCart['subtotal-amount']}`}>
                  
                </span>
              </div>
              <p className={`${pageCart['shipping-note']}`}>
                運費將於結帳時計算
              </p>
              <button
                className={`${pageCart['checkout-button']}`}
                id="animateBtn"
                onClick={handleButtonClick}
              >
                前往付款
              </button>
            </section>
          </div>
        </div>

}

export default ShoppingCart