import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    // const [error, setError ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log({ name, price, owner: localStorage.getItem('userName') });
        fetch("https://react-socket-demo-default-rtdb.firebaseio.com/auction/addProducts.json",{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ name, price, owner: 'userName',})
        }).then((response) => {
            if(response.ok){
                alert("product added!");
                navigate('/products');
            }
        })
    };

    return (
        <div>
            <div className='addproduct__container'>
                <h2>Add a new product</h2>
                <form className='addProduct__form' onSubmit={handleSubmit}>
                    <label htmfor='name'>Name of the product</label>
                    <input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor='price'>Starting price</label>
                    <input 
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    {/* <p>{{error}}</p> */}
                    <button className='addProduct__cta'>SEND</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct;