import styles from './filter-left.module.scss'
import FilterBrand from './filter-cate/filter-brand.jsx'
import FilterMaterial from './filter-cate/filter-material.jsx'
import FilterSize from './filter-cate/filter-size'

export default function FilterLeft({
  products,
  setProducts,
  checkboxStatus,
  handleCheckboxStatus,
  productCate,
}) {
  const repeat = new Set()
  const sortCate = ['頂板', '側板', '指板', '琴頸']
  

  // 查詢字串示例:
  // http://localhost:3005/api/products?brand=Karl%Höfner,Artino&size=4&top=楓木

  const renderBrandFilter = () => {
    return (
      <div className={styles['filter-option']}>
        <div className={styles['option-name']}>品牌</div>

        {/* 確保在對象存在時才執行某些操作 */}
        {products &&
          products.map((product, i) => {
            // 解構附值
            const { brand } = product
            if (!repeat.has(product.brand)) {
              repeat.add(product.brand)
              return (
                <FilterBrand
                  value={brand}
                  key={brand}
                  brand={brand}
                  checkboxStatus={checkboxStatus[brand] || false}
                  handleCheckboxStatus={() => handleCheckboxStatus(brand)}
                />
              )
            }
          })}
        {/* <div>
            <img className="mb-1" src="/public/icons/icon-plus.svg" alt="" />{' '}
            顯示更多
          </div> */}
      </div>
    )
  }

  const renderSizeFilter = () => {
    return (
      <div className={styles['filter-option']}>
        <div className={styles['option-name']}>尺寸</div>
        {products &&
          products.map((product, index) => {
            // 解構附值
            const { size } = product
            if (!repeat.has(product.size) && product.size) {
              repeat.add(product.size)
              return (
                <FilterSize
                  value={size}
                  key={size}
                  index={index}
                  size={size}
                  checkboxStatus={checkboxStatus[size] || false}
                  handleCheckboxStatus={() => handleCheckboxStatus(size)}
                />
              )
            }
          })}
      </div>
    )
  }

  const renderMaterialFilter = () => {
    return (
      <div className={styles['filter-option']}>
        <div className={styles['option-name']}>材質</div>
        {products &&
          sortCate.map((sortName, index) => {
            return (
              <FilterMaterial
                key={sortName}
                products={products}
                sortName={sortName}
                index={index}
                checkboxStatus={checkboxStatus}
                handleCheckboxStatus={handleCheckboxStatus}
              />
            )
          })}
      </div>
    )
  }

  return (
    <>
      <div className={`${styles['filter-left']} sticky-sm-top`}>
        {renderBrandFilter()}
        {productCate == 0 ? renderSizeFilter() : null}
        {productCate == 0 ? renderMaterialFilter() : null}
      </div>
    </>
  )
}
