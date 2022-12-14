import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { createProduct, getProducts, reset } from '../features/product/productSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner';

const AddProduct = () => {
    const [ productInfo, setProductInfo ] = useState({
        name: "",
        price: ""
    })

    const { name, price } = productInfo;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const { product, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.product)
    
        useEffect(() => {
          if(isError) {
            toast.error(message)
          }
    
        //   if(isSuccess || product) {
        //     navigate('/products')
        //   }
         
          return () => {
            dispatch(reset())
          }
    
        }, [productInfo, isError, isSuccess, message, navigate, dispatch])

    const onChange = e => {
        setProductInfo({...productInfo, [e.target.name]: e.target.value })
    } 

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createProduct(productInfo));
        console.log(productInfo);
        setProductInfo({
            name: "",
            price: ""
        })
        // console.log({ name, price, owner: localStorage.getItem('userName') });
        // fetch("https://react-socket-demo-default-rtdb.firebaseio.com/auction/addProducts.json",{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //     },
        //     body: JSON.stringify({ name, price, owner: localStorage.getItem('userName')})
        // }).then((response) => {
        //     if(response.ok){
        //         alert("product added!");
        //         navigate('/products');
        //     }
        // })

        // WebSocket.emit('addProduct', {
        //     name,
        //     price,
        //     owner: localStorage.getItem('userName'),
        // });
        // navigate('/products')
    };

    if (isLoading) {
        return <Spinner />
      }

    return (
        <div>
            <div className='addproduct__container'>
                <h2>Add a new product</h2>
                <form className='addProduct__form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmfor='name'>Name of the product</label>
                        <input 
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='price'>Starting price</label>
                        <input 
                            type="text"
                            name="price"
                            value={price}
                            onChange={onChange}
                            // onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='addProduct__cta'>Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;