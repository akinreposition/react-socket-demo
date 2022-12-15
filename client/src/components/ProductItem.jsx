import React from 'react'

function ProductItem({product}) {
  return (
    <div className='goal'>
        <div>{new Date(product.createdAt).toLocaleString('en-US')}</div>
        <h2>{product.name}</h2>
        <h3>{product.price}</h3>
        <h4>{product.user}</h4>
    </div>
  )
}

export default ProductItem