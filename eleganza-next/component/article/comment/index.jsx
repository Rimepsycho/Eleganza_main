import React, { useState } from 'react'
import styles from './comment.module.scss'
import CommentCard from './CommentCard'
import StarRating from '../star-rating'
import { useAuth } from '@/hooks/use-auth'
import Swal from 'sweetalert2'
export default function CommentsPage({
  articleId,
  productId,
  courseId,
  comments: initialComments, // 使用不同的名字來避免命名衝突
}) {
  const { auth } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [comments, setComments] = useState(initialComments) //初始化時使用傳入的評論數據
  const addCommentToList = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment])
  }
  const toggleModal = () => {
    if (!auth.userId) {
      // 如果未登入，顯示錯誤提示
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請先登入',
        confirmButtonText: '確定',
        confirmButtonColor: '#322826',
      })
    } else {
      // 如果已登入，則顯示或隱藏模態窗口
      setShowModal((prev) => !prev)
    }
  }
  return (
    <>
      <button className={styles['comment-button']} onClick={toggleModal}>
        我要評論
      </button>
      {showModal && ( // 根據 showModal 的值顯示或隱藏模態窗口
        <Modal
          toggleModal={toggleModal}
          userId={auth.userId} // 傳遞 userId
          articleId={articleId}
          productId={productId}
          courseId={courseId}
          addCommentToList={addCommentToList}
        />
      )}
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          star={comment}
        />
      ))}
    </>
  )
}
// 定義模態窗口組件-----------------------------------
function Modal({
  toggleModal,
  userId,
  articleId,
  productId,
  courseId,
  addCommentToList,
}) {
  const [rating, setRating] = useState(0)
  const [commentText, setCommentText] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    // 判斷登入
    if (!userId)
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請先登入',
        confirmButtonText: '確定',
        confirmButtonColor: '#322826',
      })
    //會員資料
    const formData = {
      userId: userId, // 用户ID 等會員接起來
      articleId: articleId, // 文章ID
      productId: productId,
      courseId: courseId,
      rating: rating,
      commentText: commentText,
    }
    console.log(formData) // 列印表單
    // 提交到後端
    try {
      const response = await fetch('http://localhost:3005/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), //表單打印測試
      })
      if (response.ok) {
        const newComment = await response.json()
        addCommentToList(newComment.data.comment)
        console.log('評論提交成功')
        setRating(0) // 重設評分
        setCommentText('') // 清空評論框
        // alert('評論已提交') // 提供用戶反饋
        Swal.fire({
          icon: 'success',
          title: '成功',
          text: '評論提交成功',
          confirmButtonText: '確定',
          confirmButtonColor: '#322826',
        })
        toggleModal()
      } else {
        throw new Error('Network response was not ok.')
      }
    } catch (error) {
      console.error('評論提交失敗:', error)
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '提交失敗，請登入後再試',
        confirmButtonText: '確定',
        confirmButtonColor: '#322826',
      })
      // alert('提交失敗，請稍後再試') // 提供用戶反饋
    }
  }
  // 表單
  return (
    <div className={styles['modal-background']}>
      <div className={styles['modal-content']}>
        {/*  
        onSubmit={(e) => {
            e.preventDefault()
            console.log('Form submitted')
          }}
        */}
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="star-rating">評分:</label>
            <StarRating
              onRatingChange={(rating) => {
                console.log('評分:', rating)
                setRating(rating)
              }}
              id="star-rating"
            />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="comment-text">
              <div className={styles['form-word']}>評論:</div>
              <textarea
                id="comment-text"
                rows="4"
                cols="50"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </label>
          </div>
          <button type="submit" className={styles['button-form']}>
            送出
          </button>
          <button
            type="button"
            className={styles['button-form']}
            onClick={toggleModal}
          >
            關閉
          </button>
        </form>
      </div>
    </div>
  )
}
