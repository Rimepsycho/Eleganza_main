import React from 'react'
import styles from './comment.module.scss'
import StarRating from '../star-rating'

const CommentCard = ({ comment }) => {

  return (
    <div className={styles['comment-section']}>
      <div className={styles['comment-body']}>
        <div className={styles['user-name-and-rating']}>
          {/* <div className={styles['comment_number']}>匿名使用者:</div> */}
          <h5 className={styles['user-name']}>{comment.User ? comment.User.user_name : '匿名使用者'}</h5>
          <div className={styles['comment-stars']}>
            <StarRating initRating={parseInt(comment.comment_star)} />
            {/* <time>{new Date(comment.comment_date).toLocaleDateString()}</time> */}
          </div>
        </div>
        <p className={styles['comment-text']}>{comment.comment_content}</p>
      </div>
    </div>
  )
}

export default CommentCard
