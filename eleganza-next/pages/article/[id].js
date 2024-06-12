import { useRouter } from 'next/router'
import Breadcrumb from '@/component/article/breadcrumb'
import Menu from '@/component/article/menu'
import styles from './detail.module.scss'
import SideContent from '@/component/article/sidecontent'
import CommentsPage from '@/component/article/comment'
// import articlesData from '@/data/articles.json' // 導入資料

// 用於查找特定文章
export async function getServerSideProps(context) {
  //與伺服器要求獲取資料的async函式
  const { id } = context.params

  //api 與伺服器要求獲取資料的async函式
  try {
    const [articleRes, commentsRes] = await Promise.all([
      fetch(`http://localhost:3005/api/articles/${id}`),
      fetch(`http://localhost:3005/api/comments?articleId=${id}`),
    ])
    const articleData = await articleRes.json()
    const commentsData = await commentsRes.json()

    //處理文章數據
    if (
      !articleRes.ok ||
      !articleData ||
      !articleData.data ||
      !articleData.data.article
    ) {
      console.error('未找到具體文章數據')
      return { props: { article: null, randomArticles: [], comments: [] } }
    }
    const article = articleData.data.article

    const allArticlesRes = await fetch('http://localhost:3005/api/articles')
    const allArticlesData = await allArticlesRes.json()
    const articles = allArticlesData.data.articles

    const randomArticles = articles.sort(() => 0.5 - Math.random()).slice(0, 4)
    //評論數據
    const comments =
      commentsRes.ok && commentsData.data ? commentsData.data.comments : []

    return {
      props: {
        article, // 將文章作為 prop 傳遞
        randomArticles,
        comments, // 傳遞隨機選取的 4 個文章作為 prop
      },
    }
  } catch (error) {
    console.error('取得數據時出錯:', error)
    return { props: { article: null, randomArticles: [], comments: [] } }
  }
}

export default function ArticleDetailPage({
  article,
  randomArticles,
  comments,
  user,
}) {
  const router = useRouter()

  const setCurrentPage = () => {} // 假設的設定頁碼函數
  const resetPagination = () => setCurrentPage(1)

  if (!article) {
    return <p>文章未找到</p>
  }

  // 將文章內容按換行符分割，然後渲染每一段
  const formattedArticleContent = article.article_content
    .split(',')
    .map((paragraph, index) => <p key={index}>{paragraph}</p>)

  return (
    <>
      <Breadcrumb />
      <Menu
        onSelect={(category) => router.push(`/article?category=${category}`)}
        resetPagination={resetPagination} // 傳遞 resetPagination 函數
        showSort={false}
        showSearch={false} // 將 showSearch 設置為 false
      />
      {/* 返回按鈕 */}
      <button
        className={styles['back-button']}
        onClick={() => router.push('/article')}
      >
        <img src="/icons/icon-chevron-left.svg" alt="返回" />
        返回
      </button>
      {/* 文章內容 */}
      <></>
      <div className={styles['article-content']}>
        <div className={styles['main-content']}>
          <img
            className={styles['article-image']}
            src={`/images/article/${article.article_img}`}
            alt={article.article_title}
          />
          <div className={styles['article-text']}>
            <h1>{article.article_title}</h1>
            <time>{article.article_date}</time>
            {formattedArticleContent}
          </div>
        </div>

        {/* 區塊文章 */}
        <div className={styles['side-content']}>
          <div className={styles['side-p']}>相關文章</div>
          {randomArticles.map((randomArticle) => (
            <SideContent
              key={randomArticle.article_id}
              id={randomArticle.article_id}
              imageUrl={`/images/article/${randomArticle.article_img}`}
              date={randomArticle.article_date}
              title={randomArticle.article_title}
            />
          ))}
        </div>
        <div className={styles['article-comment']}>
          <CommentsPage
            articleId={article.article_id}
            userId={user ? user.id : null}
            comments={comments}
            // productId={product.product_id} //這邊等之後props資料過來
            // courseId={course.course_id}
          />
        </div>
      </div>
    </>
  )
}
