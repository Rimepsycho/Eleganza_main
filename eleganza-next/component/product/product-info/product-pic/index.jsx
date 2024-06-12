import { useState, useEffect } from 'react'
import styles from './product-pic.module.scss'

export default function ProductPic({ product, picsArr }) {
  const [picSrc, setPicSrc] = useState(`/images/product_images/${product.img}`)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  // scale
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setHoverPosition({ x, y })
    //  console.log(hoverPosition)
  }

  // 商品預覽
  const handleClick = (pic) => {
    setPicSrc(`/images/product_images/${pic}`)
  }

  // 上一張
  const handlePrev = () => {
    const currentIndex = picsArr.findIndex(
      (pic) => `/images/product_images/${pic}` === picSrc,
    )

    if (currentIndex === -1 || currentIndex === 0) {
      setPicSrc(`/images/product_images/${picsArr[picsArr.length - 1]}`)
    } else {
      setPicSrc(`/images/product_images/${picsArr[currentIndex - 1]}`)
    }
  }

  // 下一張
  const handleNext = () => {
    const currentIndex = picsArr.findIndex(
      (pic) => `/images/product_images/${pic}` === picSrc,
    )
    if ( currentIndex +1 === picsArr.length) {
      setPicSrc(`/images/product_images/${picsArr[0]}`)
    } else {
      const next = `/images/product_images/${picsArr[currentIndex + 1]}`
      setPicSrc(next)
    }
  }

  useEffect(() => {
    if (product) {
      setPicSrc(`/images/product_images/${product.img}`)
    }
  }, [product])

  return (
    <>
      <div className={`row`}>
        <div className={`col-10`}>
          <div
            className={`${styles['product-pic']} h-100`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setHoverPosition({ x: 0, y: 0 })
            }}
          >
            <div
              className="ratio ratio-1x1 "
              style={{
                transform: `translate(${-hoverPosition.x * 3}px, ${-hoverPosition.y * 3}px)`,
                transition: 'transform 0.1s',
              }}
            >
              <img className={`${styles['obj-fit']}`} src={picSrc} alt="" />
            </div>
          </div>
        </div>
        <div className={`col-2`}>
          <div className="d-flex flex-column justify-content-between h-100 position-relative align-items-center">
            <div
              className={`${styles['arrow']} text-center`}
              onClick={handlePrev}
            >
              <img src="/icons/icon-chevron-up.svg" alt="" />
            </div>
            <div className=" flex-grow-1">
              <div
                className={`${styles['preview']} d-flex flex-column overflow-y-auto`}
              >
                {picsArr.slice(0, 5).map((v, i) => {
                  return (
                    <img
                      className={
                        picSrc === `/images/product_images/${v}`
                          ? `my-1 ${styles['current']}`
                          : `my-1`
                      }
                      key={i}
                      src={`/images/product_images/${v}`}
                      alt=""
                      onClick={() => handleClick(v)}
                    />
                  )
                })}
              </div>
            </div>

            <div
              className={`${styles['arrow']} text-center`}
              onClick={handleNext}
            >
              <img src="/icons/icon-chevron-down.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
