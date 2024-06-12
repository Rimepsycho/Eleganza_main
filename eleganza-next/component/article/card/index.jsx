import React, { useState, useEffect } from 'react'
import styles from './card.module.scss'
import Link from 'next/link'

//文章範例
// import data from '@/data/article.json'

export default function Cards({ id, imageUrl, date, title, summary }) {
  const [truncatedTitle, setTruncatedTitle] = useState(title)
  const [truncatedSummary, setTruncatedSummary] = useState(summary)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        // 在螢幕寬度小於或等於375px時進行剪裁
        setTruncatedTitle(
          title.length > 20 ? `${title.slice(0, 20)}...` : title,
        )
        setTruncatedSummary(
          summary.length > 20 ? `${summary.slice(0, 20)}...` : summary,
        )
      }

      if (window.innerWidth >= 375) {
        setTruncatedTitle(
          title.length > 30 ? `${title.slice(0, 30)}...` : title,
        )
        setTruncatedSummary(
          summary.length > 50 ? `${summary.slice(0, 50)}...` : summary,
        )
      } else {
        // 在螢幕寬度大於375px時使用完整的文字
        setTruncatedTitle(title)
        setTruncatedSummary(summary.none)
      }
    }
    handleResize() // 組件首次渲染時執行一次，以確保初始設置是正確的

    window.addEventListener('resize', handleResize)

    // 清理函數，當組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [title, summary])

  //測試用假資料
  // const Article = {
  //   article_id: '1',
  //   article_class_id: '2',
  //   article_title:
  //     '小提琴教學指南：從初學者到高級水平的進階技巧,小提琴是一種古老而美妙的樂器，它可以帶給我們無限的音樂樂趣和挑戰。如果你正在開始學習小提琴，或者想提高你的技能，這份教學指南將幫助你踏上成功的道路。',
  //   article_img: 'article1.jpg',
  //   article_date: '07/20/2018',
  //   article_content: '小提琴教學指南',
  // }

  //設定物件初始值
  // const [article, setArticle] = useState({
  //   article_id: '',
  //   article_class_id: '',
  //   article_title: '',
  //   article_img: '',
  //   article_date: '',
  //   article_content: '',
  // })
  // const [articles, setArticles] = useState(data)
  //與伺服器要求獲取資料
  // const getArticle = async (pid) => {
  //接json資料
  // const url = `https://my-json-server.typicode.com/eyesofkids/json-fake-data/products/${pid}`;
  // }

  return (
    <>
      <Link href={`/article/${id}`}>
        <div className={styles['card']}>
          <div className={styles['article-img']}>
            <img src={imageUrl} alt={title} />
          </div>
          <div className={styles['article-text']}>
            <time>{date}</time>
            <h3>{truncatedTitle}</h3>
            <p>{truncatedSummary}</p>
          </div>
        </div>
      </Link>
    </>
  )
}
