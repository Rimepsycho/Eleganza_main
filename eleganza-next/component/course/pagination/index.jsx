import React from 'react';
import styles from './pagination.module.scss';

const Pagination = ({ currentPage, totalCourses, coursesPerPage, onChange }) => {
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  const handlePageClick = (pageNumber) => {
    onChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={currentPage === i ? styles.active : ''}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        &lt;
      </button>
      {renderPageNumbers()}
      <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
