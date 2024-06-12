import React from 'react'
import styles from './leftcolumn.module.scss'

export default function CourseDetailLeft({ course }) {
  return (
    <div className={styles['left-column']}>
      <img
        src={`/images/course_images/${course.course_img}`}
        alt={course.course_name}
        className={styles['course-img']}
      />
      <div className={styles['course-description']}>
        <h3>課程簡介</h3>
        <p>{course.course_description}</p>
      </div>
      <h4>商品細項</h4>
      <div className={styles['download-button']}>
        <button>點我下載</button>
      </div>
    </div>
  )
}
