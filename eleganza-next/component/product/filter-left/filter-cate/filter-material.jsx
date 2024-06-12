import { useState } from 'react'
import styles from '../filter-left.module.scss'

export default function FilterMaterial({
  products,
  sortName,
  index,
  checkboxStatus,
  handleCheckboxStatus,
}) {
  const repeat = new Set()
  return (
    <>
      <div>
        <div
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${index}`}
          aria-expanded="false"
          aria-controls={`#collapse${index}`}
        >
          {sortName} <img src="/icons/icon-chevron-down.svg" />
        </div>
        <div className="collapse" id={`collapse${index}`}>
          <div className="my-2">
            {products.map((v, i) => {
              {
                /* 幹你娘老雞掰 */
              }
              let option
              switch (sortName) {
                case '頂板':
                  option = v.top
                  break
                case '側板':
                  option = v.back_and_sides
                  break
                case '指板':
                  option = v.fingerboard
                  break
                case '琴頸':
                  option = v.neck
                  break
              }
              if (!repeat.has(option) && option) {
                repeat.add(option)
                return (
                  <div key={i + sortName}>
                    <input
                      className={styles['checkbox']}
                      type="checkbox"
                      id={`${option + index}`}
                      checked={checkboxStatus[option + sortName] || false}
                      onChange={() => handleCheckboxStatus(option + sortName)}
                    />
                    <label htmlFor={`${option + index}`}>{`${option}`}</label>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}
