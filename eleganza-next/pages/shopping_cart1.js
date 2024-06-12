// 原本的
// import React, { useEffect, useState } from 'react'
// import { fetchCart } from '@/hooks/cartapi'
// import ShoppingCart from '../component/shopping_cart/purchasepagecart'
// import Login from '../component/shopping_cart/login'
// import Eleganza from '../component/shopping_cart/eleganza'
// import useAuth from '../hooks/useAuth'

// const Index = () => {
//   const { isAuthenticated, user_id } = useAuth()
//   const [cartItems, setCartItems] = useState([])
//   const [isCartEmpty, setIsCartEmpty] = useState(true)

//   useEffect(() => {
//     const loadCart = async () => {
//       if (isAuthenticated && user_id) { // 檢查 user_id 是否存在
//         try {
//           const items = await fetchCart(user_id)
//           if (Array.isArray(items)) {
//             setCartItems(items)
//             setIsCartEmpty(items.length === 0)
//           } else {
//             setCartItems([])
//             setIsCartEmpty(true)
//           }
//         } catch (error) {
//           console.error('Failed to load cart:', error)
//           setCartItems([])
//           setIsCartEmpty(true)
//         }
//       }
//     }
//     loadCart()
//   }, [isAuthenticated, user_id])

//   if (!isAuthenticated) {
//     return <Login />
//   }

//   if (isCartEmpty) {
//     return <Eleganza />
//   }

//   return <ShoppingCart cartItems={cartItems} />
// }

// export default Index