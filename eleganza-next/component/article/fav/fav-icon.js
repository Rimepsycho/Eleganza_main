import { useAuth } from '@/hooks/use-auth'
import { addFav, removeFav } from '@/services/user'
import toast from 'react-hot-toast' // 確保已引入

import Image from 'next/image'

// 愛心實心圖和空心圖作為靜態資源導入
import favIconFill from '@/public/icons/icon-like.svg'
import favIconEmpty from '@/public/icons/icon-liked.svg'

export default function FavIcon({ id }) {
  const authContext = useAuth();

  if (!authContext) {
    // 可以處理錯誤，顯示錯誤信息，或返回 null/其他 fallback UI
    console.error('Auth context not available');
    return null;
  }

  const { auth, favorites, setFavorites } = authContext;

  const handleToggleFav = async (pid) => {
    if (favorites.includes(pid)) {
      const res = await removeFav(pid);
      if (res.data.status === 'success') {
        setFavorites(favorites.filter((v) => v !== pid));
        toast.success(`商品 id=${pid} 刪除成功!`);
      } else {
        toast.error('操作失敗！');
      }
    } else {
      const res = await addFav(pid);
      if (res.data.status === 'success') {
        setFavorites([...favorites, pid]);
        toast.success(`商品 id=${pid} 新增成功!`);
      } else {
        toast.error('操作失敗！');
      }
    }
  };

  return (
    <button
      onClick={() => {
        if (!auth.isAuth) {
          toast.error('會員才能使用!');
          return;
        }
        handleToggleFav(id);
      }}
      style={{ padding: 0, border: 'none', background: 'none' }}
    >
      <Image
        src={favorites.includes(id) ? favIconFill : favIconEmpty}
        alt="Favorite Icon"
        width={20}
        height={20}
      />
    </button>
  );
}
