import React, { useState } from 'react'
import styles from './card.module.scss'

export default function Card({ teachers }) {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const handleIconClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <>
      {teachers.map((teacher, index) => (
        <div key={index} className={styles['card-column']}>
          <div className={styles['card-row']}>
            <div className={styles['card-body']}>
              <div className={styles['image-container']}>
                <img
                  src={`/images/teacher_images/${teacher.t_img}`}
                  className={styles['card-image']}
                  alt={`Teacher ${teacher.t_name}`}
                />
              </div>
              <div className={styles['card-header']}>
                <div className={styles['text-box']}>
                  <h4>{teacher.t_name}</h4>
                </div>
                <div className={styles['text-box']}>
                  <ul>
                    <li>學歷: {teacher.education}</li>
                    <li>教學年資: {teacher.t_years}年</li>
                    <li>曾獲獎項: {teacher.winning}</li>
                  </ul>
                </div>
              </div>
              <div className={styles['card-footer']}>
                <div
                  className={styles['card-icons']}
                  onClick={() => handleIconClick(index)}
                >
                  <img
                    src={
                      expandedIndex === index
                        ? '/icons/icon-chevron-up.svg'
                        : '/icons/icon-chevron-down.svg'
                    }
                    alt="Toggle Details"
                    className="expand-icon"
                  />
                </div>
              </div>
              <div
                className={`${styles['card-content']} ${expandedIndex === index ? styles.expanded : ''}`}
              >
                <div className={styles['content-text']}>
                  <div className={styles['three-column-layout']}>
                    <div className={styles.column}>
                      <p>教師簡介</p>
                      <p>{teacher.introduction}</p>
                    </div>
                    <div className={styles.column}>
                      <p>教學經歷</p>
                      <p>{teacher.experience}</p>
                    </div>
                    <div className={styles.column}>
                      <p>教授課程</p>
                      {teacher.courses.map((course, courseIndex) => (
                        <p key={courseIndex}>{course}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${styles['card-row']} ${expandedIndex === index ? styles['expanded-row'] : ''}`}
          ></div>
        </div>
      ))}
    </>
  )
}
