import React, { useState } from 'react'
import styles from './article-sort.module.scss'

export default function Sort({ selectedOption, handleOptionClick }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={styles['sort-container']}>
        <button
          className={styles['sort-button']}
          onClick={toggleDropdown}
          aria-expanded={isOpen}
        >
          排序
          {selectedOption}
          <img
            className="mb-1"
            src={
              isOpen
                ? '/icons/icon-chevron-up.svg'
                : '/icons/icon-chevron-down.svg'
            }
            alt=""
          />
        </button>
        {isOpen && (
          <ul className={styles['dropdown-menu']} style={{ display: 'block' }}>
            <li>
              <button
                className={styles['dropdown-item']}
                onClick={() => {
                  handleOptionClick('日期最新')
                  toggleDropdown()
                }}
              >
                日期最新
              </button>
            </li>
            <li>
              <button
                className={styles['dropdown-item']}
                onClick={() => {
                  handleOptionClick('日期最舊')
                  toggleDropdown()
                }}
              >
                日期最舊
              </button>
            </li>
            <li>
              <button
                className={styles['dropdown-item']}
                onClick={() => {
                  handleOptionClick('按 ID 降序')
                  toggleDropdown()
                }}
              >
                按 ID 降序
              </button>
            </li>
            <li>
              <button
                className={styles['dropdown-item']}
                onClick={() => {
                  handleOptionClick('按 ID 升序')
                  toggleDropdown()
                }}
              >
                按 ID 升序
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  )
}
