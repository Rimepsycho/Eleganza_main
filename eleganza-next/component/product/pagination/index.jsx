import React from 'react'
import styles from './pagination.module.scss'

export default function Pagination({
  pageCount, //int 2
  handlePageClick,
  currentPage,
  pagination,
}) {
  const pageLinks = () => {
    const links = []
    for (let i = 0; i < pageCount; i++) {
      // console.log(i * 12 == pagination)
      links.push(
        <div
          key={i}
          className={`${styles['link']} ${i * 12 === pagination ? styles['current'] : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i + 1}
        </div>,
      )
    }
    return links
  }

  return (
    <>
      <div className={`${styles['pagination']}`}>
        <div className="d-flex justify-content-center align-item-center mx-auto">
          <div className={`${styles['pages']} d-flex align-items-center`}>
            <div className={`${styles['prev']} mb-1`}>
              <img src="./icons/icon-chevron-left.svg" alt="" />
            </div>
            {pageLinks()}
            <div className={`${styles['next']} mb-1`}>
              <img src="./icons/icon-chevron-right.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
