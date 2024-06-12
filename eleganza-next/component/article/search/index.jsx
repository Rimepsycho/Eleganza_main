import React, { useState } from 'react'
import Image from 'next/image'
import styles from './article-search.module.scss'

export default function Search({
  isVisible,
  onToggleVisibility,
  onSearchChange,
}) {
  const [input, setInput] = useState('')

  const handleInputChange = (e) => {
    setInput(e.target.value)
    // onSearchChange(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchChange(input) // 只有按下 Enter 時才觸發搜索
    }
  }

  return (
    <>
      <div className={styles['article-search']}>
        <div
          className={styles['input-container']}
          style={{ visibility: isVisible ? 'visible' : 'hidden' }}
        >
          {isVisible && (
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="搜索文章..."
              className={styles['search-input']}
            />
          )}
        </div>
        <button onClick={onToggleVisibility} className={styles['search-icon']}>
          <Image
            src="/icons/icon-search.svg"
            alt="搜索"
            width={16}
            height={16}
          />
        </button>
      </div>
    </>
  )
}
