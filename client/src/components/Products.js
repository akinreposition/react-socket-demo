import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { getProducts, reset } from '../features/product/productSlice';
import { toast } from 'react-toastify';

const Products = () => {   
    // const [ product, setProduct ] = useState()
    // const dispatch = useDispatch
    const navigate = useNavigate();

    const handleBidBtn = (product) => navigate(`/products/bid/${product.name}/${product.price}`);

    const { user } = useSelector((state) => state.auth)

    const { product, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.product)
    
        useEffect( () => {
          if(isError) {
            toast.error(message)
          }
    
          if(isSuccess || product) {
            toast.success("List of Product available")
          }
    
        }, [ isError, isSuccess, message])   
    
    if (isLoading) {
        return <Spinner />
      }

    return (
        <div>
            <div className='table__container'>
                <Link to="/" className='products__cta'>
                    ADD PRODUCTS
                </Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Last Bidder</th>
                            <th>Creator</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {/* Data for display, we will later get it from the server */}
                    <tbody>
                         {
                        //     loading ? (
                        //     <tr>
                        //         <td></td>
                        //     </tr>
                        // ) : 
                        ( 
                            product.map((product) => (
                                <tr key={`${product.name}${product.price}`}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.last_bidder || 'None'}</td>
                                    <td>{user}</td>
                                    <td>
                                        <button onClick={()=> handleBidBtn(product)}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Products;