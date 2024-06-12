import { useState } from 'react'

export default function Searchbar({ handleClick, showInput, params, handleSearch }) {
 
  return (
    <>
      <div className="search position-relative d-flex align-items-center">
        <input
          className={showInput ? 'show searchInput' : 'searchInput'}
          type="text"
          placeholder=""
          params={params}
          onChange={handleSearch}
        />
        <button className="px-2 position-absolute end-0 " type="button">
          <img
            className="mb-1"
            src="/icons/icon-search.svg"
            onClick={handleClick}
            alt=""
          />
        </button>
      </div>

      <style jsx>{`
        .search input {
          outline: none;
          padding-inline: 10px;
          display: none;
          border-radius: 8px;
          height: 24px;
          border: 0px solid var(--color-secondary-dark);
          transition: width 0.3s ease-in-out; /* 添加過渡效果 */
          box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
          width: 0; /* 起始時設置為0 */
        }

        .search input.show {
          display: block;
          width: 200px; /* 定義輸入框的寬度 */
        }
      `}</style>
    </>
  )
}
