import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const BidProduct = ({socket}) => {
      // Destructured from the URL
      const { name, price} = useParams();
    // sets the default value as the current price from the Product page
    const [userInput, setUserInput ] = useState(price);
    const [error, setError] = useState(false);

  

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput > Number(price)){
            socket.emit('bidProduct', {
                userInput,
                last_bidder: localStorage.getItem('userName'),
                name,
            });
            navigate('/products');
        } else {
            setError(true);
        }
       
    };

    return (
        <div>
            <div className='bidproduct__container'>
                <h2>Place a Bid</h2>
                <form className='bidProduct__form' onSubmit={handleSubmit}>
                    <h3 className='bidProduct__name'>Product Name</h3>

                    <label htmlFor='amount'>Bidding Amount</label>
                    {/* The error message */}
                    {error && (
                        <p style={{color: 'red'}}> 
                            The bidding amount must be greater than {price}
                        </p>
                    )}
                    <input 
                        type="number"
                        name="amount"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        required
                    />

                    <button className='bidProduct__cta'>SEND</button>
                </form>
            </div>
        </div>
    )
}

export default BidProduct;