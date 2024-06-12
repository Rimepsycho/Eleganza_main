// fetchCart: 取得用戶購物車內容

export const fetchCart = async () => { // 移除 user_id 參數
  const params = new URLSearchParams(window.location.search);
  const user_id = params.get('userId');

  if (!user_id) {
    throw new Error('User ID is required')
  }
  const response = await fetch(`http://localhost:3005/api/cart/${user_id}`, { // 在 URL 中包含 user_id
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 使用身份驗證
    },
  })
  const data = await response.json() // 解析 JSON
  return data.data // 返回購物車內容
}

// fetchCart: 取得用戶購物車內容
// 原本
// export const fetchCart = async (user_id) => { // 添加 user_id 參數
//   if (!user_id) {
//     throw new Error('User ID is required')
//   }
//   const response = await fetch(`http://localhost:3005/api/cart/${user_id}`, { // 在 URL 中包含 user_id
//     headers: {
//       'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 使用身份驗證
//     },
//   })
//   const data = await response.json() // 解析 JSON
//   return data.data // 返回購物車內容
// }

// updateQuantity: 更新購物車中某個產品的數量
export const updateQuantity = async (user_id, quantity) => {
  await fetch(`http://localhost:3005/api/cart/${user_id}`, { // 在 URL 中包含 user_id
    method: 'PUT', // 使用 PUT 方法更新
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 身份驗證
    },
    body: JSON.stringify({ quantity }), // 傳送新的數量
  })
}

// removeItem: 從購物車中移除產品
export const removeItem = async (user_id) => {
  await fetch(`http://localhost:3005/api/cart/${user_id}`, { // 在 URL 中包含 user_id
    method: 'DELETE', // 使用 DELETE 方法移除
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 身份驗證
    },
  })
}