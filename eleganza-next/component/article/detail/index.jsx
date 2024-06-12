import React from 'react'
import styles from './ArticleDetail.module.scss'
import articleData from '@/data/articles.json'
import Image from 'next/image'

function ArticleDetail({ articleKey }) {
  const article = articleData.find((item) => item.id === articleKey) // 根據 key 找到對應的文章資料
  if (!article) {
    return null
  }
  // 如果找不到對應的文章，返回 null 或其他適當的處理方式

  return (
    <div className={styles['article-detail']}>
      <div className={styles['article-body']}>
        <Image
          className={styles['article-image']}
          src={`/images/article/${article.article_img}`}
          alt={article.article_title}
          width={920}
          height={360}
        />
        <div className={styles['article-header']}>
          <h1 className={styles['article-title']}>{article.article_title}</h1>
          <time className={styles['article-date']}>{article.article_date}</time>
        </div>
        <p className={styles['article-content']}>{article.article_content}</p>
      </div>
    </div>
  )
}

export default ArticleDetail
