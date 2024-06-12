import React, { useState, useEffect, useCallback } from 'react'
import Breadcrumb from '@/component/article/breadcrumb'
import Menu from '@/component/article/menu'
import Cards from '@/component/article/card'
import Pagination from '@/component/article/pagination'
// import articles from '@/data/articles.json'
import styles from './index.module.scss'
//import FavIcon from '@/component/article/fav/fav-icon'

// 載入指示動畫
// import Loader from '@/components/product/loader';
// import LoadingBar from 'react-top-loading-bar';

export default function Index() {
  //儲存文章數據
  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1) //這是顯示的頁數
  const [selectedCategory, setSelectedCategory] = useState(0) // 用於儲存目前選取的類別
  const [sortOrder, setSortOrder] = useState('newest') // 預設為依日期最新排序

  // 新增處理搜尋結果的函數
  const handleSearchResults = (searchResults) => {
    setArticles(searchResults)
    setCurrentPage(1) // 重置到第一頁
  }

  const articlesPerPage = 9 // 分頁

  //api 與伺服器要求獲取資料的async函式
  const fetchArticles = async () => {
    try {
      // const response = await fetch('http://localhost:3005/api/articles')
      const url = `http://localhost:3005/api/articles?sort=${sortOrder}` // 添加排序查询参数
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === 'success') {
        setArticles(data.data.articles)
      }
    } catch (error) {
      console.error('取得文章失敗:', error)
    }
  }
  //分類
  useEffect(() => {
    fetchArticles()
    const params = new URLSearchParams(window.location.search)
    const category = parseInt(params.get('category') || '0', 10)
    setSelectedCategory(category)
  }, [])

  //根據selectedCategory篩選文章
  const filteredArticles =
    selectedCategory === 0
      ? articles
      : articles.filter(
          (article) => article.article_class_id === selectedCategory,
        )

  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )

  const handleOptionClick = (option) => {
    let sortOption
    switch (option) {
      case '按 ID 升序':
        sortOption = 'id_asc'
        break
      case '按 ID 降序':
        sortOption = 'id_desc'
        break
      case '日期最新':
        sortOption = 'newest'
        break
      case '日期最舊':
        sortOption = 'oldest'
        break
      default:
        sortOption = 'id_desc' // 將預設設為按 ID 降序
    }

    if (sortOrder !== sortOption) {
      setSortOrder(sortOption)
    } else {
      fetchArticles() // 即使相同也強制更新，以應對可能的其他變數影響
    }
  }

  // 當 sortOrder 改變時，重新載入文章
  useEffect(() => {
    fetchArticles()
  }, [sortOrder])

  return (
    <>
      {/* <LoadingBar progress={progress} />
      {isLoading ? <Loader /> : display}  動畫用先放著*/}
      <Breadcrumb />
      {/*setSelectedCategory 傳遞给 Menu 組件 */}
      <Menu
        onSelect={setSelectedCategory}
        onSearch={handleSearchResults}
        fetchArticles={fetchArticles} //fetchArticles 傳遞 prop
        resetPagination={() => setCurrentPage(1)} // 傳遞一個重置頁碼的函數
        handleSortChange={handleOptionClick} //確保傳遞這個函數
        showSort={true}
        showSearch={true}
      />
      <div className={styles['cards-container']}>
        {currentArticles.map((article) => (
          <Cards
            key={article.article_id}
            id={article.article_id}
            imageUrl={`/images/article/${article.article_img}`}
            date={article.article_date}
            title={article.article_title}
            summary={article.article_content}
          />
        ))}
      </div>
      {/* 分頁 */}
      {filteredArticles.length > articlesPerPage && (
        <Pagination
          currentPage={currentPage}
          articlesPerPage={articlesPerPage}
          totalArticles={filteredArticles.length}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  )
}
