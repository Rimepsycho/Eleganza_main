import React from 'react'
import ProductPic from './product-pic'
import ProductDetail from './product-detail/product-detail'
import ProductDiscribe from './product-discribe/product-discribe'

export default function Detail({ product, picsArr, introduction }) {
  return (
    <>
      <div className="row justify-content-between mb-0 mb-md-5">
        <div className="col-12 col-md-6">
          <ProductPic product={product} picsArr={picsArr} />
        </div>
        <div className="col-12 col-md-5">
          <ProductDetail product={product} />
        </div>
      </div>
      <hr className="d-block d-md-none" />
      <ProductDiscribe introduction={introduction} />
    </>
  )
}
