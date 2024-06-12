import React, { useState } from 'react'
import styles from './navbar.module.scss'

export default function Navbar({ onSelect }) {
  const [currentCourse, setCurrentCourse] = useState('全部課程')
  const handleCourseSelect = (course) => {
    onSelect(course)
    setCurrentCourse(course)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <button
              className={`${styles['button']} ${currentCourse == '全部課程' ? styles['current'] : ''}`}
              onClick={() => handleCourseSelect('全部課程')}
            >
              全部課程
            </button>
          </li>
          <li>
            <button
              className={`${styles['button']} ${currentCourse == '初階個別課' ? styles['current'] : ''}`}
              onClick={() => handleCourseSelect('初階個別課')}
            >
              初階個別課
            </button>
          </li>
          <li>
            <button
              className={`${styles['button']} ${currentCourse == '中階個別課' ? styles['current'] : ''}`}
              onClick={() => handleCourseSelect('中階個別課')}
            >
              中階個別課
            </button>
          </li>
          <li>
            <button
              className={`${styles['button']} ${currentCourse == '高階個別課' ? styles['current'] : ''}`}
              onClick={() => handleCourseSelect('高階個別課')}
            >
              高階個別課
            </button>
          </li>
          <li>
            <button
              className={`${styles['button']} ${currentCourse == '團體班' ? styles['current'] : ''}`}
              onClick={() => handleCourseSelect('團體班')}
            >
              團體班
            </button>
          </li>
          <li>
            <button
              className={`${styles['button']} ${currentCourse == '大師班' ? styles['current'] : ''}`}
              onClick={() => handleCourseSelect('大師班')}
            >
              大師班
            </button>
          </li>
        </ul>
        <div
          className={`${styles['navbar-icons']} d-flex align-items-center justify-content-between`}
        >
          <a href="">
            <img className={styles.search} src="./icons/icon-search.svg" />
          </a>
          <div className={styles['navbar-icons2']}>
            <a href="">排序</a>
            <a href="">
              <img
                className={styles['chevron-down']}
                src="./icons/icon-chevron-down.svg"
              />
            </a>
          </div>
        </div>
      </nav>
      <hr></hr>
      <div className={styles['filter-container']}>
        <a className={styles.Filter} href="#">
          篩選條件
          <img src="./icons/icon-chevron-down.svg" alt="" />
        </a>
        <a className={styles.sort} href="">
          sort by
          <img src="./icons/icon-chevron-down.svg" alt="" />
        </a>
      </div>
    </>
  )
}
