import { useRouter } from 'next/router'
import Breadcrumb from '@/component/course/breadcrumb'
import CourseDetailRight from '@/component/course/course_detail/right-column' 
import CourseDetailLeft from '@/component/course/course_detail/left-column' 
import CommentsPage from '@/component/article/comment' 
import axios from 'axios'
import styles from './detail.module.scss' 

// 從後端 API 獲取課程詳情和評論
export async function getServerSideProps(context) {
  const { id } = context.params
  try {
    const [courseRes, commentsRes] = await Promise.all([
      axios.get(`http://localhost:3005/api/courses/${id}`),
      axios.get(`http://localhost:3005/api/comments/course/${id}`),
    ])

    if (!courseRes.data || !commentsRes.data) {
      console.error('API data is missing')
      return { props: { course: null, comments: [] } }
    }

    if (
      courseRes.data.status === 'error' ||
      commentsRes.data.status === 'error'
    ) {
      console.error(
        'API calls failed:',
        courseRes.data.message,
        commentsRes.data.message,
      )
      return { props: { course: null, comments: [] } }
    }
    // 確保 comments 是一個數組
    const comments = Array.isArray(commentsRes.data.data.comments)
      ? commentsRes.data.data.comments
      : []

    return {
      props: {
        course: courseRes.data.data.course || null,
        comments,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { props: { course: null, comments: [] } }
  }
}

export default function CourseDetailPage({ course, comments }) {
  const router = useRouter()
  const user = {} // 從某處獲取的用戶信息
  console.log(course)

  if (!course) {
    return <p>課程未找到</p>
  }

  return (
    <>
      <div className={styles['container']}>
        <Breadcrumb />
        <div className={styles['separator']} />
        <button
          className={styles['back-button']}
          onClick={() => router.push('/course')}
        >
          <img src="/icons/icon-chevron-left.svg" alt="返回" />
          返回
        </button>
        <div className={styles['course-details-container']}>
          <CourseDetailLeft course={course} />
          <CourseDetailRight course={course} />
        </div>
        <div className={styles['comments-container']}>
          <CommentsPage
            courseId={course.course_id}
            userId={user ? user.id : null}
            comments={comments}
          />
        </div>
      </div>
    </>
  )
}
