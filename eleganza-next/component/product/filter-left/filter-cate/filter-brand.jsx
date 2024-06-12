import React, { useState } from 'react'
import styles from '../filter-left.module.scss'

export default function FilterBrand({
  brand,
  checkboxStatus,
  handleCheckboxStatus,
}) {

  return (
    <>
      <input
        key={brand}
        className={styles['checkbox']}
        type="checkbox"
        id={brand}
        name=""
        checked={checkboxStatus}
        onChange={handleCheckboxStatus}
      />
      <label htmlFor={brand}>{brand}</label>
      <br />
    </>
  )
}
