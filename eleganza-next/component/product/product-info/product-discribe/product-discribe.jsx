import React from 'react'
import styles from './product-discribe.module.scss'

export default function ProductDiscribe({ introduction }) {
//   console.log(introduction)
  const introductionStr = introduction.split('\n').map((line, index) => {
    return (
      <React.Fragment key={index}>
        • {line}
        <br />
      </React.Fragment>
    )
  })
  return (
    <>
      <div className={styles['product-detail']}>
        <span>商品細項</span>
        <p>{introductionStr}</p>
      </div>
    </>
  )
}
