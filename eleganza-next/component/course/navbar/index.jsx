import React, { useEffect, useState } from 'react';
import styles from './navbar.module.scss';
import { searchHelper } from '@/util/searchHelper';

export default function Navbar({ courseList, onCourseFilter, onSortChange, onSearchChange }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 1, name: '初階個別課' },
    { id: 2, name: '中階個別課' },
    { id: 3, name: '高階個別課' },
    { id: 4, name: '團體班' },
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCourseFilter(categoryId);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value)
    onSearchChange(searchHelper(courseList, event.target.value));
  };

  useEffect(()=>{
    onSearchChange(courseList, '')
  },[])

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <button
            className={!selectedCategory ? styles.active : ''}
            onClick={() => handleCategoryClick(null)}
          >
            全部課程
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={selectedCategory === category.id ? styles.active : ''}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles['search-and-sort']}>
        <img src="/icons/icon-search.svg" alt="Search" />
        <input
          type="text"
          placeholder="搜尋課程..."
          // value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <label htmlFor="sortSelect" className={styles.sortLabel}>排序</label>
        <select
          id="sortSelect"
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <option value="">請選擇</option>
          <option value="priceAsc">價格從低到高</option>
          <option value="priceDesc">價格從高到低</option>
        </select>
      </div>
    </nav>
  );
}