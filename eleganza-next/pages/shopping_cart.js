import React, { useEffect, useState } from 'react';
import { fetchCart } from '@/hooks/cartapi';
import ShoppingCart from '../component/shopping_cart/purchasepagecart';
import Login from '../component/shopping_cart/login';
import Eleganza from '../component/shopping_cart/eleganza';
import axios from 'axios';

const Index = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedUserId && storedAccessToken) {
      // 發送獲取使用者資訊的請求
      axios.get(`http://localhost:3005/api/home-myaccount/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
        .then((response) => {
          setUserDetails(response.data.userDetails);
          console.log('user_id:', response.data.userDetails.user_id); // 在這裡加上 console.log 來檢查 user_id
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });

      // 發送獲取購物車資料的請求
      axios.get(`http://localhost:3005/api/cart/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
        .then((response) => {
          setCartItems(response.data.data.cartItems);
          setIsCartEmpty(response.data.data.cartItems.length === 0);
        })
        .catch((error) => {
          console.error('Error fetching cart details:', error);
        });
    }
  }, []);

  if (!userDetails) {
    return <Login />;
  }

  if (isCartEmpty) {
    return <Eleganza />;
  }

  return <ShoppingCart cartItems={cartItems} />;
};

export default Index;
