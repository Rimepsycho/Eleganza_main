import React, { useState } from 'react'
import styles from '../filter-left.module.scss'

export default function FilterSize({
  size,
  checkboxStatus,
  handleCheckboxStatus,
}) {
  let violinSize
  if (size === '3') {
    violinSize = '3/4'
  } else {
    violinSize = '4/4'
  }
  return (
    <>
      <input
        className={styles['checkbox']}
        type="checkbox"
        id={size}
        name="classical"
        checked={checkboxStatus}
        onChange={handleCheckboxStatus}
      />
      
      <label htmlFor={size}>{violinSize}</label>
      <br />
    </>
  )
}
