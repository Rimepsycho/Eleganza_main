import React from 'react'
import styles from './breadcrumb.module.scss'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Breadcrumb({ currentPage, handleIconClick }) {
  // const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  // const toggleSideNav = () => {
  //   setIsSideNavVisible(!isSideNavVisible);
  // };

  return (
    <>
      <div className={styles['tabs-desktop']}>
        <ul className={`list-unstyled`}>
          <li>
            <Link href="http://localhost:3000/">首頁</Link> /
          </li>
          <li>
            <Link href="/users/account-center/account-center">會員中心</Link> /
          </li>
          <li className={styles['current']}>
            <a href="">{currentPage}</a>
          </li>
        </ul>
      </div>
      <div className={styles['tabs-mobile']}>
        <ul className={`list-unstyled`}>
          <li>
            <Link href="#" onClick={handleIconClick}>
              <img src="/icons/icon-chevron-left.svg" alt="" />
            </Link>
            {currentPage}
          </li>
        </ul>
      </div>
    </>
  )
}
