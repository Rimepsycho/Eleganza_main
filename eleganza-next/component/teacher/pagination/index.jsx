import React from 'react';
import styles from './pagination.module.scss';

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems <= itemsPerPage) {
    return null; 
  }

  const changePage = (page) => {
    window.scrollTo(0, 0); 
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles['pagination-icon']} ${currentPage > 1 ? '' : styles.disabled}`}
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <img src="/icons/icon-chevron-left.svg" alt="Previous" />
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          className={`${styles['pagination-button']} ${number + 1 === currentPage ? styles.active : ''}`}
          onClick={() => changePage(number + 1)}
        >
          {number + 1}
        </button>
      ))}
      <button
        className={`${styles['pagination-icon']} ${currentPage < totalPages ? '' : styles.disabled}`}
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <img src="/icons/icon-chevron-right.svg" alt="Next" />
      </button>
    </div>
  );
}
