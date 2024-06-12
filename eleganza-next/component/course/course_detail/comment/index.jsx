import React from 'react'
import styles from './comment.module.scss'

export default function Comment() {
  return (
    <div className={styles['course-comments']}>
      <div className="bottom-column-title">
        <p>8則評論</p>
        <div className={styles['stars-container']}>
          <div className={styles['stars']}>
            <img src="/icons/icon-star-solid.svg" alt="" />
            <img src="/icons/icon-star-solid.svg" alt="" />
            <img src="/icons/icon-star-solid.svg" alt="" />
            <img src="/icons/icon-star-solid.svg" alt="" />
            <img src="/icons/icon-star.svg" alt="" />
          </div>
          <p>4.3(24)</p>
        </div>
        <button>我要評論</button>
      </div>
      <div className="navbar-divider" />
      <div className={styles['course-comments-container']}>
        <div className={styles['comments-card']}>
          <div style={{ float: 'left' }}>
            <img
              src="/t3.jpg"
              alt=""
              style={{
                borderRadius: '50%',
                width: 50,
                height: 50,
                marginRight: 10,
              }}
            />
          </div>
          <div style={{ float: 'left', marginLeft: 10 }}>
            <p style={{ marginBottom: 5 }}>user1</p>
            <div className={styles['stars-container']}>
              <div className={styles.stars}>
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star.svg" alt="" />
              </div>
            </div>
            <p className={styles['comment-short']} style={{ marginTop: 5 }}>
              Short comment from user1.
            </p>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
        <div className={styles['comments-card']}>
          <div style={{ float: 'left' }}>
            <img
              src="/t3.jpg"
              alt=""
              style={{
                borderRadius: '50%',
                width: 50,
                height: 50,
                marginRight: 10,
              }}
            />
          </div>
          <div style={{ float: 'left', marginLeft: 10 }}>
            <p style={{ marginBottom: 5 }}>user2</p>
            <div className={styles['stars-container']}>
              <div className={styles.stars}>
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
                <img src="/icons/icon-star-solid.svg" alt="" />
              </div>
            </div>
            <p className={styles['comment-short']} style={{ marginTop: 5 }}>
              Another short comment from user2.
            </p>
          </div>
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    </div>
  )
}
