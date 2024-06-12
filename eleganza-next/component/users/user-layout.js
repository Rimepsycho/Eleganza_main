import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../default-layout/header'
import Footer from '../default-layout/footer'
import styles from './main.module.scss'
import SideNav from './sidenav'
import Breadcrumb from './breadcrumb'

export default function UserLayout({ currentPage, children }) {
  const [windowWidth, setWindowWidth] = useState(0)
  const [showSideNav, setShowSideNav] = useState(true)
  const [isSideNavVisible, setIsSideNavVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    setWindowWidth(window.innerWidth) // 初始設置 windowWidth
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // 空的依賴數組以僅在組件掛載時設置一次

  // const shouldRenderSideNav = windowWidth > 1024; // 調整閾值

  // 判断是否在小于 1024px 的情况下显示侧边栏
  useEffect(() => {
    setShowSideNav(windowWidth > 1024)
  }, [windowWidth])

  // 处理点击 Breadcrumb 上的图标来切换侧边栏的显示状态
  const handleBreadcrumbIconClick = () => {
    setShowSideNav(!showSideNav)
  }

  const handleIconClick = () => {
    setIsSideNavVisible(!isSideNavVisible)
  }

  return (
    <>
      <Head>
        <title>User Layout</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <div className={styles['custom-breadcrumb']}>
        <Breadcrumb
          currentPage={currentPage}
          handleIconClick={handleBreadcrumbIconClick}
        />
      </div>
      <div className="wrap flex-grow-1">
        <div className={styles['main']}>
          {/* 條件渲染 SideNav */}
          {showSideNav && <SideNav />}
          {/* 條件渲染 Children */}
          {windowWidth >= 1024 && !isSideNavVisible && children}
          {!showSideNav && windowWidth <= 1024 && children}
        </div>
      </div>

      <Footer />
    </>
  )
}
