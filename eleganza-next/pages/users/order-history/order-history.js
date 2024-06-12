import { useState, useEffect } from 'react'
import React from 'react'
import Head from 'next/head'
import styles from './order-history.module.css'
import OrderHistoryUnfoldCard from '@/component/users/cards/orderhistoryunfold'
import UserLayout from '@/component/users/user-layout'
import { useAuth } from '@/hooks/use-auth'

export default function OrderHistoryUnfold() {
  const { auth } = useAuth()

  return (
    <>
      <div className={styles['mainarea-desktop-collection']}>
        <OrderHistoryUnfoldCard />
      </div>
      <div className={styles['lesson-mobile']}>
        <OrderHistoryUnfoldCard />
      </div>
    </>
  )
}

OrderHistoryUnfold.getLayout = function (page) {
  return <UserLayout currentPage="歷史訂單">{page}</UserLayout>
}
