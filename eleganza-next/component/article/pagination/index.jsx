import React from 'react'
import styles from './pagination.module.scss'

export default function Pagination({
  currentPage,
  totalArticles,
  articlesPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalArticles / articlesPerPage)
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <a
        href="#!"
        key={i}
        className={
          i === currentPage
            ? `${styles['pagination-number']} ${styles['active']}`
            : styles['pagination-number']
        }
        onClick={(e) => {
          e.preventDefault()
          onPageChange(i)
        }}
      >
        {i}
      </a>,
    )
  }

  return (
    <div className={styles['pagination']}>
      <a
        href="#!"
        className={styles['pagination-arrow']}
        onClick={(e) => {
          e.preventDefault()
          if (currentPage > 1) onPageChange(currentPage - 1)
        }}
      >
        <img src="/icons/icon-chevron-left.svg" alt="Previous" />{' '}
      </a>
      {pages}
      <a
        href="#!"
        className={styles['pagination-arrow']}
        onClick={(e) => {
          e.preventDefault()
          if (currentPage < totalPages) onPageChange(currentPage + 1)
        }}
      >
        <img src="/icons/icon-chevron-right.svg" alt="Next" />{' '}
      </a>
    </div>
  )
}
