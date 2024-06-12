import { useState, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'
import styles from './mobile-cardlayout.module.css'
import ProductCollectionCard from '@/component/users/cards/productcollection'
import UserLayout from '@/component/users/user-layout'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function ProductCollection() {
  const { auth } = useAuth()

  return (
    <>
      <div className={styles['mainarea-desktop-collection']}>
        <ProductCollectionCard />
      </div>
      <div className={styles['lesson-mobile']}>
        <div className={styles['btn-mobile']}>
          <div className={styles['sbtn-selected']}>
            <Link href="/users/mobile-cardlayout/product-collection">
              商品收藏
            </Link>
          </div>
          <div className={styles['sbtn']}>
            <Link href="/users/mobile-cardlayout/lesson-collection">
              課程收藏
            </Link>
          </div>
        </div>
        <ProductCollectionCard />
      </div>
    </>
  )
}

ProductCollection.getLayout = function (page) {
  return <UserLayout currentPage="收藏內容">{page}</UserLayout>
}
