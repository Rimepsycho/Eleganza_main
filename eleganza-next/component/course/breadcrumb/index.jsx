import React from 'react';
import Link from 'next/link';
import styles from './breadcrumb.module.scss';

export default function Breadcrumb() {
  return (
    <div className={styles.breadcrumb}>
      <Link href="/" passHref>
        <div>首頁</div>
      </Link>
      <span className={styles.separator}>/</span>
      <Link href="/course" passHref>
        <div>精選課程</div>
      </Link>
      <a href="#" className={styles['chevron-left']}>
        <img src="/icons/icon-chevron-left.svg" alt="Chevron Left" />
      </a>
      <a href="#" className={styles.prev}>
        上一頁
      </a>
      <a href="#" className={styles.search}>
        <img src="/icons/icon-search.svg" alt="Search" />
      </a>
    </div>
  );
}
