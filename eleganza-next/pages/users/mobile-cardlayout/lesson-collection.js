import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from './mobile-cardlayout.module.css'
import LessonCollectionCard from '@/component/users/cards/lessoncollection/'
import UserLayout from '@/component/users/user-layout'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'

export default function LessonCollection() {
  const [user, setUser] = useState({})
  const router = useRouter()
  const { auth } = useAuth()

  return (
    <>
          <div className={styles['mainarea-desktop-collection']}>
            <LessonCollectionCard />
          </div>
          <div className={styles['lesson-mobile']}>
            <div className={styles['btn-mobile']}>
              <div className={styles['sbtn']}>
                <Link href="/users/mobile-cardlayout/product-collection">
                  商品收藏
                </Link>
              </div>
              <div className={styles['sbtn-selected']}>
                <Link href="/users/mobile-cardlayout/lesson-collection">
                  課程收藏
                </Link>
              </div>
            </div>
            <LessonCollectionCard />
          </div>
        
    </>
  )
}

LessonCollection.getLayout = function (page) {
  return <UserLayout currentPage="收藏內容">{page}</UserLayout>
}
