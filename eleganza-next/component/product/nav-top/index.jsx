import { useEffect, useState } from 'react'
import styles from './nav-top.module.scss'
import BreadCrumb from './bread-crumb/bread-crumb'
import Sort from './sort/sort'
import FilterLeft from '../filter-left'
import Searchbar from './search-bar/Searchbar'

export default function NavTop({
  selectedOption,
  handleOptionClick,
  products,
  setProducts,
  checkboxStatus,
  handleCheckboxStatus,
  productCate,
  handleCateClick,
  handleClick,
  showInput,
  handleSearch,
  params
}) {
  const cates = ['小提琴', '提琴盒', '提琴弓', '松香']

  //   搜尋框

  return (
    <>
      <div className={styles['nav-top']}>
        <BreadCrumb handleClick={handleClick} showInput={showInput} />
        <div>
          <div className="d-flex justify-content-between align-content-center">
            <div
              className={`${styles['cate-btns']} d-flex justify-content-between`}
            >
              {cates.map((cate, i) => {
                return (
                  <div
                    key={i}
                    className={`${styles['cate-btn']} ${productCate === i ? styles['current'] : ''}`}
                    onClick={() => handleCateClick(i)}
                  >
                    {cate}
                  </div>
                )
              })}
            </div>
            <div className="d-none d-md-block d-flex align-content-center">
              <div
                className={`${styles['filter-top']} d-flex justify-content-between align-content-center`}
              >
                {/* {showInput ? (
                  <div className="position-relative">
                    <input className="" type="text" placeholder="" />
                    <button onClick={handleClick}>
                      <img
                        className="mb-1 "
                        src="/icons/icon-search.svg"
                        alt=""
                      />
                    </button>
                  </div>
                ) : (
                  <button onClick={handleClick}>
                    <img className="mb-1" src="/icons/icon-search.svg" alt="" />
                  </button>
                )} */}

                <Searchbar
                  // showInput={showInput}
                  handleClick={handleClick}
                  showInput={showInput}
                  handleSearch={handleSearch}
                />
                <Sort
                  selectedOption={selectedOption}
                  handleOptionClick={handleOptionClick}
                />
                <span>
                  <img className="mb-1" src="/icons/icon-list.svg" alt="" />
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div
            className={`d-flex justify-content-between align-items-center d-block d-md-none mb-3`}
          >
            <button
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              篩選條件
              <img src="/icons/icon-chevron-down.svg" alt="" />
            </button>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header d-flex justify-content-between align-items-center">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  篩選條件
                </h5>
                <button>
                  <img
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    src="/icons/icon-x.svg"
                  />
                </button>
              </div>
              <div className="offcanvas-body">
                <FilterLeft
                  products={products}
                  setProducts={setProducts}
                  checkboxStatus={checkboxStatus}
                  handleCheckboxStatus={handleCheckboxStatus}
                  productCate={productCate}
                  // setProductCate={setProductCate}
                  // cates={cates}
                />
              </div>
            </div>
            <Sort
              selectedOption={selectedOption}
              handleOptionClick={handleOptionClick}
            />
          </div>
        </div>
      </div>
    </>
  )
}
