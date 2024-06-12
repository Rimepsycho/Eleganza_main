import { useCallback } from 'react'

const useAddToCart = () => {
  const addToCart = useCallback(async ({ id, type }) => {
    const user_id = localStorage.getItem('userId')
    console.log(user_id)
    console.log(id)

    if (!id || !user_id) {
      console.error('無效的 id 或 user_id')
      return
    }

    try {
      const response = await fetch('http://localhost:3005/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [`${type}_id`]: id, user_id }),
      })

      const result = await response.json()

      if (response.ok) {
        console.log('新增購物車商品成功:', result)
      } else {
        console.error('新增購物車商品失敗:', result.message)
      }
    } catch (error) {
      console.error('新增購物車項目時出錯:', error)
    }
  }, [])

  return { addToCart }
}

export default useAddToCart
