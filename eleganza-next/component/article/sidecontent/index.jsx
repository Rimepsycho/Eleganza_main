// SideContent.jsx
import React, { useState, useEffect } from 'react'
import styles from './side-content.module.scss'
// import articlesData from '@/data/articles.json'
import Image from 'next/image'
import Link from 'next/link'

export default function SideContent({ id, imageUrl, date, title, summary }) {
  const [truncatedTitle, setTruncatedTitle] = useState(title)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        // 在螢幕寬度小於或等於375px時進行剪裁
        setTruncatedTitle(
          title.length > 20 ? `${title.slice(0, 20)}...` : title,
        )
      }

      if (window.innerWidth >= 375) {
        setTruncatedTitle(
          title.length > 30 ? `${title.slice(0, 30)}...` : title,
        )
      }
    }
    handleResize() // 組件首次渲染時執行一次，以確保初始設置是正確的

    window.addEventListener('resize', handleResize)

    // 清理函數，當組件卸載時移除事件監聽器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [title, summary])
  return (
    <div className={styles['side-content']}>
      <div className={styles['side-card']}>
        {/* 使用 Link 組件進行導航 */}
        <Link href={`/article/${id}`}>
          <div className={styles['side-img']}>
            <Image src={imageUrl} alt={title} width={279} height={190} />
          </div>
          <div className={styles['side-text']}>
            <time className={styles['side-date']}>{date}</time>
            <h3 className={styles['side-title']}>{truncatedTitle}</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
