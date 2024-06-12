import { useState, useEffect } from 'react'
import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import LoginForm from '@/component/users/form/login'

export default function Header() {
  const { auth } = useAuth()
  const router = useRouter()
  const [showOffcanvas, setShowOffcanvas] = useState(false)

  return (
    <>
      <header>
        <div className={`${styles['header-container']} fixed-top`}>
          <div className={styles.logo}>
            <a href="">ELEGANZA</a>
          </div>
          <div className="d-none d-xl-block">
            <ul
              className={`d-flex justify-content-between align-content-center list-unstyled m-0 `}
            >
              <li className={styles.link}>
                <a href="/">關於阿爾扎</a>
              </li>
              <li className={styles.link}>
                <Link href="/products">商品總覽</Link>
              </li>
              <li className={styles.link}>
                <Link href="/course">精選課程</Link>
              </li>
              <li className={styles.link}>
                <Link href="/teacher">師資陣容</Link>
              </li>
              <li className={styles.link}>
                <Link href="/article">弦樂專欄</Link>
              </li>
            </ul>
          </div>

          <div
            className={`${styles['header-icons']} 
               d-flex align-items-center justify-content-between`}
          >
            <div href="" className="d-none d-xl-block">
              <Link href="/shopping_cart">
                <img className={styles.cart} src="/icons/icon-cart-white.svg" />
              </Link>
            </div>

            <Link
              href={
                auth.isLoggedIn
                  ? '/users/account-center/account-center'
                  : '/users/user-form/login'
              }
            ></Link>

            <button
              type="button"
              onClick={() => {
                if (!auth.isLoggedIn) {
                  setShowOffcanvas(!showOffcanvas)
                } else {
                  router.push('/users/account-center/account-center')
                }
              }}
            >
              <img
                className={styles.account}
                src="/icons/icon-user-white.svg"
              />
            </button>
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
            {/* MENU */}
            <button
              className="d-block d-xl-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRightMenu"
              aria-controls="offcanvasRightMenu"
            >
              <img src="/icons/icon-menu-white.svg" />
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRightMenu"
              aria-labelledby="offcanvasRightMenuLabel"
            >
              <div className="offcanvas-header">
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body d-flex flex-column list-unstyled justify-content-between ">
                <div className="flex-grow-1  d-flex flex-column justify-content-center">
                  <ul className={`${styles['menu']} list-unstyled`}>
                    <li className={styles.link}>
                      <a href="/">關於阿爾扎</a>
                    </li>
                    <li className={styles.link}>
                      <Link href="/products">商品總覽</Link>
                    </li>
                    <li className={styles.link}>
                      <Link href="/course">精選課程</Link>
                    </li>
                    <li className={styles.link}>
                      <Link href="/teacher">師資陣容</Link>
                    </li>
                    <li className={styles.link}>
                      <Link href="/article">弦樂專欄</Link>
                    </li>
                    <li className={styles.link}>
                      <Link href="/shopping_cart">購物車</Link>
                    </li>
                  </ul>
                </div>
                <div className={`${styles['logo-menu']}`}>
                  <a href="">ELEGANZA</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
