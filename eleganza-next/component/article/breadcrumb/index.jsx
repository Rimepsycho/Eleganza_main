import React from 'react'
import styles from './breadcrumb.module.scss'
import Link from 'next/link'

export default function ArticleBreadcrumb() {
  return (
    <nav>
      <ol className={styles['breadcrumb']}>
        <li className={styles['breadcrumb-item']}>
          <Link href="/">
            <span className={styles['link']}>首頁&nbsp;&nbsp;&nbsp;/</span>
          </Link>
        </li>
        <li className={styles['breadcrumb-item']}>
          <Link href="/article">
            <span className={styles['link']}>&nbsp;&nbsp;&nbsp;弦樂專欄</span>
          </Link>
        </li>
        <li className={styles['breadcrumb-item-in']}>
          <button
            className={styles['back-button']}
            onClick={() => window.history.back()}
          >
            <img src="/icons/icon-chevron-left.svg" alt="返回" />
            弦樂專欄
          </button>
        </li>
      </ol>
    </nav>
  )
}
