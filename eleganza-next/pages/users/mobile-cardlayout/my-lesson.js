import { useState, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'
import styles from './mobile-cardlayout.module.css'
import LessonCard from '@/component/users/cards/lessoncard'
import UserLayout from '@/component/users/user-layout'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function MyLesson() {
  const { auth } = useAuth()

  return (
    <>
      <div className={styles['mainarea-desktop-mylesson']}>
        <LessonCard />
      </div>
      <div className={styles['lesson-mobile']}>
        <div className={styles['btn-mobile']}>
          <div className={styles['sbtn-selected']}>
            <Link href="">全部課程</Link>
          </div>
          <div className={styles['sbtn']}>
            <Link href="">尚未開始</Link>
          </div>
          <div className={styles['sbtn']}>
            <Link href="">課程結束</Link>
          </div>
        </div>
        <LessonCard />
      </div>
    </>
  )
}

MyLesson.getLayout = function (page) {
  return <UserLayout currentPage="我的課程">{page}</UserLayout>
}
