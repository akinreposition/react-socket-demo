import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../features/product/productSlice'

function ProductItem({product}) {
  const dispatch = useDispatch()  ;
  return (
    <div className='goal'>
        <div>{new Date(product.createdAt).toLocaleString('en-US')}</div>
        <h2 key={product.name}>{product.name}</h2>
        <h3 key={product.price}>{product.price}</h3>
        <h4 key={product.id}>{product.user}</h4>
        <button onClick={() => dispatch(deleteProduct(product._id))} className="close">X</button>
    </div>
  )
}

export default ProductItem