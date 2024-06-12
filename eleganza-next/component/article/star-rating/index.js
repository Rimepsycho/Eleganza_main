import React, { useEffect, useState } from 'react'
// 導入.module.css檔案
import styles from './star.module.css'
//重新引入的時候，建議重開

export default function StarRating({
  initRating = 0, //初始的評分
  maxCount = 5, //最大可評分的分數
  onRatingChange = () => {},
  color = 'gold',
  icon = <>&#9733;</>, //預設只是星星符號元素
}) {
  //點按時的評分，一開始是0分代表沒有評分
  //initRating是一個初始化用的值，代表元件一開始渲染(呈現)時用一次，之後就會有相關
  //反樣式:以props作為state初始值(Props In Initial State)，也與derived state(衍生的狀態)有關
  const [rating, setRating] = useState(initRating)

  // 滑鼠游標懸停(hover)時使用，一開始是0分代表沒有評分
  const [hoverRating, setHoverRating] = useState(0)

  //解決上述反樣式的其一方式，完全同步傳入的initRating(如果父母的狀態時)
  useEffect(() => {
    //當initRating有變動後，會執行一次這裡的程式碼
    setRating(initRating)
  }, [initRating])
  //^^^^^^^^^^^監聽 initRating的變動(change)
  return (
    <>
      {/* 這裡使用簡易建立5個陣列1...N的語法，可以參考
      https://github.com/orgs/mfee-react/discussions/50 */}
      <div>
        {/* 宣告一個虛擬空間讓它實體化 */}
        {Array(maxCount)
          .fill(1)
          .map((v, i) => {
            //每個按鈕的分數，相當於索引+1
            const score = i + 1

            return (
              <button
                key={i}
                type="button"
                className={styles['star-btn']}
                onClick={(e) => {
                  e.stopPropagation() // 阻止事件冒泡
                  //點按後設定分數
                  setRating(score)
                  // 利用onRatingChange的函式，可以回送分數到父母元件
                  onRatingChange(score)
                }}
                onMouseEnter={() => {
                  //滑鼠游標移出時設定分數
                  setHoverRating(score)
                }}
                onMouseLeave={() => {
                  //滑鼠游標移出時設定分數為
                  setHoverRating(0)
                }}
              >
                <span
                  // 如果這個星星的分數(score)小於等於目前的評分(rating)，或小於目前的滑鼠游標懸停(hover)評分，則套用亮起樣式
                  //使用CSS Modules樣式套用
                  className={
                    score <= rating || score <= hoverRating
                      ? styles['on']
                      : styles['off']
                  }
                  //使用style-jsx樣式方式來套用
                  // className={
                  //   score <= rating || score <= hoverRating ? 'on' : 'off'
                  // }

                  // 這裡要在有屬性color 傳入時，設定css變數的值，讓star.module.css進行套用
                  style={{ '--on-color': color }}

                  // 使用style屬性作動態屬性傳入套用
                  // style={{
                  //   color:
                  //     score <= rating || score <= hoverRating ? color : 'gray',
                  // }}
                >
                  {/* &#9733; */}
                  {/* <FaStar /> */}
                  {icon}
                </span>
              </button>
            )
          })}
      </div>
      {/* 以下的syled-jsx語法可以用樣板字串的方式套用傳入屬性變數color */}
      {/* <style jsx>{`
        .on {
          color: ${color};
        }
        .off {
          color: gray;
        }
      `}</style> */}
    </>
  )
}
