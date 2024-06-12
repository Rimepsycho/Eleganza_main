import { useState, useEffect } from 'react'
import React from 'react'
import styles from './lessoncard.module.scss'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import moment from 'moment-timezone'

export default function LessonCard() {
  const [lessonDetails, setLessonDetails] = useState(null)
  const { auth } = useAuth()
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
          // 如果 localStorage 中沒有 accessToken，則不執行後續操作
          return
        }
        const parseJwt = (token) => {
          const base64Payload = token.split('.')[1]
          const payload = Buffer.from(base64Payload, 'base64')
          return JSON.parse(payload.toString())
        }

        // 解析 JWT 並提取 userData
        const userData = parseJwt(accessToken)

        setLessonDetails(userData) // 更新使用者資料狀態
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    fetchUserData() // 執行取得使用者資料的函式
  }, [])

  const getLessons = async () => {
    const url = `http://localhost:3005/api/my-lessoncollection/lessonorder/${auth.userData.id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)

    if (Array.isArray(data.corders)) {
      setLessons(data.corders)
    } else {
      console.error('Collections data is not an array:', data.corders)
    }
  }
  // 樣式2: didMount階段只執行一次
  useEffect(() => {
    // 頁面初次渲染之後伺服器要求資料
    getLessons()
  }, [])

  // 當lessons為空時顯示空白狀態
  if (lessons.length === 0) {
    return (
      <>
        <div className={styles['mainarea-desktop-collection-empty']}>
          <div className={styles['emptycontent-empty']}>
            <p>您尚未有任何課程</p>
          </div>
          <div className={styles['sbtn-empty']}>
            <Link href="/course">前往購買</Link>
          </div>
        </div>
        <div className={styles['lesson-mobile-empty']}>
          <div className={styles['emptycontent-empty']}>
            <p>您尚未有任何課程</p>
          </div>
          <div className={styles['sbtn-empty']}>
            <Link href="/course">前往購買</Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {lessons.map((v, i) => (
        <div key={v.user_id}>
          <div className={styles['lessoncard']}>
            <Link href={`/course/${v.course_id}`}>
              <img
                src={`/images/course_images/${v.course_img}`}
                alt=""
                className={styles['lessoncardimg']}
              />
            </Link>
            <div className={styles['lessoncard-word']}>
              <ul className={`${styles.lessoncardtitle} list-unstyled`}>
                <li className={styles['lessondate']}>
                  {moment(v.start_date).tz('Asia/Taipei').format('YYYY-MM-DD')}
                </li>
                <li>
                  <Link
                    className={styles['lessonname']}
                    href={`/course/${v.course_id}`}
                  >
                    {v.course_name}
                  </Link>
                </li>
                <li>
                  <Link className={styles['teachername']} href="/teacher">
                    {v.course_teacher_name} 教師
                  </Link>
                </li>
              </ul>
              <ul className={`list-unstyled`}>
                <li className={styles['lessoncardtime']}>{v.start_time}</li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
