import BreadCrumb from '@/component/product/nav-top/bread-crumb/bread-crumb'
import Detail from '@/component/product/product-info'
import Recommend from '@/component/product/recommend/recommend'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import CommentsPage from '@/component/article/comment'
import LoginForm from '@/component/users/form/login'
import { useAuth } from '@/hooks/use-auth'

//傳遞評論的內容
export async function getServerSideProps(context) {
  // 處理登入及購物車

  const { pid } = context.params
  try {
    const [productRes, commentsRes] = await Promise.all([
      fetch(`http://localhost:3005/api/products/${pid}`),
      fetch(`http://localhost:3005/api/comments/product/${pid}`),
    ])
    const productData = await productRes.json()
    const commentsData = await commentsRes.json()

    if (!productRes.ok || !commentsRes.ok) {
      console.error('API calls failed')
      return { props: { product: null, comments: [] } }
    }

    return {
      props: {
        product: productData.data.product,
        comments: commentsData.data.comments,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { props: { product: null, comments: [] } }
  }
}

export default function ProductDetail({ comments }) {
  const user = {}
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    num: '',
    price: '',
    img: '',
    pics: '',
    introduction: '',
  })
  const [recommendProduct, setRecommendProduct] = useState([])
  const router = useRouter()

  const getProduct = async (pid) => {
    const url = `http://localhost:3005/api/products/${pid}`

    try {
      const res = await fetch(url)
      const data = await res.json()

      if (typeof data.data.product === 'object' && data.data.product !== null) {
        setProduct(data.data.product)
        setRecommendProduct(data.data.suggest_products)
      } else {
        alert('u mom is dead')
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (router.isReady) {
      getProduct(router.query.pid)
    }
  }, [router.isReady])
  const picsArr = product.pics.split(',')
  const introduction = product.introduction.replace(/,/g, '\n')
  return (
    <>
      <div className="container">
        <BreadCrumb />
        <Detail
          product={product}
          picsArr={picsArr}
          introduction={introduction}
        />
        <CommentsPage
          productId={product.product_id}
          userId={user ? user.id : null}
          comments={comments}
        />
        <hr className="d-block d-md-none" />
        <Recommend recommendProduct={recommendProduct} />
      </div>
    </>
  )
}
